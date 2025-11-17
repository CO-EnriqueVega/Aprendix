document.addEventListener('DOMContentLoaded', () => {
    
    // Lista de módulos con sus títulos y rutas
    const moduleData = [
        { id: 'modulo-1', title: 'Módulo 1: ¿Qué es SCRUM? 🤔', path: 'index.html' },
        { id: 'modulo-2', title: 'Módulo 2: Los Tres Pilares 🏛️', path: 'modulos/modulo-2.html' },
        { id: 'modulo-3', title: 'Módulo 3: Roles del Equipo 🎭', path: 'modulos/modulo-3.html' },
        { id: 'modulo-4', title: 'Módulo 4: Los Artefactos 🛠️', path: 'modulos/modulo-4.html' },
        { id: 'modulo-5', title: 'Módulo 5: Los Eventos ⏱️', path: 'modulos/modulo-5.html' },
        { id: 'modulo-6', title: 'Módulo 6: El Ciclo Completo 🔄', path: 'modulos/modulo-6.html' },
        { id: 'modulo-7', title: 'Módulo 7: SCRUM en la Vida Diaria 🏠', path: 'modulos/modulo-7.html' },
        { id: 'modulo-8', title: 'Módulo 8: Errores Comunes 🛑', path: 'modulos/modulo-8.html' },
        { id: 'modulo-9', title: 'Módulo 9: Para Ir Más Allá 📈', path: 'modulos/modulo-9.html' },
        { id: 'modulo-10', title: 'Módulo 10: El Siguiente Paso 🎓', path: 'modulos/modulo-10.html' }
    ];

    const menu = document.getElementById('module-menu');
    const ul = document.createElement('ul');
    
    // Obtener la URL actual para saber en qué módulo estamos
    const currentPath = window.location.pathname;
    
    // Generar el menú lateral dinámicamente
    moduleData.forEach(module => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        
        // Define la ruta relativa basada en la ubicación del archivo
        // Si estamos dentro de /modulos, debemos retroceder con '../'
        let linkPath = module.path;
        if (currentPath.includes('/modulos/')) {
            // Ajustar para que los enlaces apunten correctamente (ej: ../index.html)
            if (module.id === 'modulo-1') {
                linkPath = '../index.html';
            } else {
                linkPath = module.path.replace('modulos/', ''); // Quita la carpeta 'modulos/' si ya estamos dentro
            }
        }
        
        a.href = linkPath;
        a.textContent = module.title;
        a.setAttribute('data-module-id', module.id);

        // Resaltar el módulo activo
        // Compara el final de la URL actual con el 'path' definido
        if (currentPath.endsWith(module.path) || (currentPath.endsWith('index.html') && module.id === 'modulo-1')) {
             a.classList.add('active');
        }

        // Si estamos en un subdirectorio, necesitamos una lógica más simple para 'active'
        const currentFile = currentPath.substring(currentPath.lastIndexOf('/') + 1);
        const moduleFile = module.path.substring(module.path.lastIndexOf('/') + 1);

        if (currentFile === moduleFile) {
            a.classList.add('active');
        }


        li.appendChild(a);
        ul.appendChild(li);
    });

    menu.appendChild(ul);

    // 🔹 Aquí agregamos la función toggleSidebar
    function toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('active');
    }

    // 🔹 Ejemplo: asignar el evento a un botón con id "sidebar-toggle"
    const toggleBtn = document.getElementById('sidebar-toggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', toggleSidebar);
    }

});