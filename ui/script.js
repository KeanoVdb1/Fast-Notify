window.addEventListener('message', (event) => {
    if (event.data.action === 'showNotification') {
        showNotification(event.data);
    }
});

const notificationContainers = {
    'top': document.createElement('div'),
    'top-right': document.createElement('div'),
    'top-left': document.createElement('div'),
    'bottom': document.createElement('div'),
    'bottom-right': document.createElement('div'),
    'bottom-left': document.createElement('div'),
    'center': document.createElement('div')
};

// Initialize containers
for (let position in notificationContainers) {
    notificationContainers[position].className = `notification-container ${position}`;
    document.body.appendChild(notificationContainers[position]);
}

function showNotification(data) {
    const notificationElement = document.createElement('div');
    notificationElement.className = `notification`;
    notificationElement.style.setProperty('--background-color', data.type ? Config.Types[data.type].backgroundColor : Config.Types.info.backgroundColor);
    notificationElement.style.setProperty('--border-color', data.type ? Config.Types[data.type].borderColor : Config.Types.info.borderColor);
    notificationElement.style.setProperty('--duration', `${data.duration}ms`);

    // Add icon or logo
    const iconElement = document.createElement('div');
    iconElement.className = 'notification-icon';
    if (data.icon) {
        if (data.icon.startsWith('fa-')) {
            // Font Awesome icon
            const iconI = document.createElement('i');
            iconI.className = `fas ${data.icon}`;
            iconElement.appendChild(iconI);
        } else {
            // Custom logo
            const iconImg = document.createElement('img');
            iconImg.src = data.icon;
            iconImg.alt = 'Notification Icon';
            iconElement.appendChild(iconImg);
        }
    } else {
        // Default icon based on notification type
        const iconI = document.createElement('i');
        iconI.className = `fas ${Config.Types[data.type].icon || 'fa-info-circle'}`;
        iconElement.appendChild(iconI);
    }
    notificationElement.appendChild(iconElement);

    // Set initial state for animation
    notificationElement.style.opacity = '0';
    notificationElement.style.transform = getInitialTransform(data.position);

    if (data.title) {
        const titleElement = document.createElement('div');
        titleElement.className = 'notification-title';
        titleElement.textContent = data.title;
        notificationElement.appendChild(titleElement);
    }

    const messageElement = document.createElement('div');
    messageElement.className = 'notification-message';
    messageElement.textContent = data.message;
    notificationElement.appendChild(messageElement);

    const container = notificationContainers[data.position];
    container.appendChild(notificationElement);

    // Trigger animation
    setTimeout(() => {
        notificationElement.style.opacity = '1';
        notificationElement.style.transform = 'translate(0, 0)';
    }, 10);

    setTimeout(() => {
        removeNotification(notificationElement, container);
    }, data.duration);
}

function removeNotification(notificationElement, container) {
    notificationElement.classList.add('removing');
    notificationElement.style.opacity = '0';
    notificationElement.style.transform = getInitialTransform(container.className.split(' ')[1]);
    
    setTimeout(() => {
        notificationElement.remove();
    }, 600);
}


function getInitialTransform(position) {
    switch(position) {
        case 'top':
        case 'top-left':
        case 'top-right':
            return 'translateY(-20px)';
        case 'bottom':
        case 'bottom-left':
        case 'bottom-right':
            return 'translateY(20px)';
        case 'center':
            return 'scale(0.8)';
        default:
            return 'translateY(-20px)';
    }
}

const Config = {
    Types: {
        success: {
            backgroundColor: "#141414",
            borderColor: "#eaf207",
            icon: "fa-check-circle"
        },
        error: {
            backgroundColor: "#141414",
            borderColor: "#eaf207",
            icon: "fa-exclamation-circle"
        },
        info: {
            backgroundColor: "#141414",
            borderColor: "#eaf207",
            icon: "fa-info-circle"
        },
        warning: {
            backgroundColor: "#141414",
            borderColor: "#eaf207",
            icon: "fa-exclamation-triangle"
        }
    }
};