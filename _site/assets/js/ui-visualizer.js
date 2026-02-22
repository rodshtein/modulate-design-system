function waitForJsYaml(maxAttempts = 50, interval = 100) {
  return new Promise((resolve, reject) => {
    let attempts = 0;
    const check = () => {
      attempts++;
      // js-yaml может быть доступен как jsyaml или YAML
      if (typeof jsyaml !== 'undefined' && jsyaml.load) {
        resolve(jsyaml);
      } else if (typeof YAML !== 'undefined' && YAML.load) {
        resolve(YAML);
      } else if (attempts >= maxAttempts) {
        reject(new Error('js-yaml library failed to load'));
      } else {
        setTimeout(check, interval);
      }
    };
    check();
  });
}

async function loadUIStructure() {
  try {
    // Ждем загрузки js-yaml
    const yamlLib = await waitForJsYaml();
    
    // Загружаем ui.yaml
    const response = await fetch('/ui.yaml');
    if (!response.ok) {
      throw new Error(`Failed to load ui.yaml: ${response.status}`);
    }
    
    const yamlText = await response.text();
    
    // Парсим YAML
    const routes = yamlLib.load(yamlText);
    
    // Рендерим структуру
    renderUIStructure(routes);
  } catch (error) {
    console.error('Error loading UI structure:', error);
    const container = document.getElementById('ui-structure');
    if (container) {
      container.innerHTML = `<p style="color: rgba(var(--ids__UI-error-RGB), 1);">Error loading UI structure: ${error.message}</p>`;
    }
  }
}

function renderUIStructure(routes) {
  const container = document.getElementById('ui-structure');
  if (!container) {
    console.error('Container #ui-structure not found');
    return;
  }
  
  container.innerHTML = '';
  
  routes.forEach(route => {
    const routeBlock = document.createElement('pre');
    routeBlock.className = 'ui-route-block';
    
    let content = `- route: ${route.route}\n`;
    content += `  title: ${route.title}\n`;
    content += `  sections:\n`;
    
    route.sections.forEach(section => {
      content += `    - component: ${section.component}\n`;
      if (section.states && section.states.length > 0) {
        content += `      states:\n`;
        section.states.forEach(state => {
          content += `        - ${state}\n`;
        });
      }
    });
    
    routeBlock.textContent = content;
    container.appendChild(routeBlock);
  });
}

// Запускаем загрузку после загрузки DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadUIStructure);
} else {
  // DOM уже загружен
  loadUIStructure();
}
