local function ShowNotification(data)
    SendNUIMessage({
        action = 'showNotification',
        type = data.type or 'info',
        title = data.title,
        message = data.message,
        duration = data.duration or Config.DefaultDuration,
        position = data.position or Config.DefaultPosition
    })
end

RegisterNetEvent('kp-notify:showNotification')
AddEventHandler('kp-notify:showNotification', ShowNotification)

exports('ShowNotification', ShowNotification)

-- Test commands
RegisterCommand('testnotify', function(source, args)
    local type = args[1] or 'info'
    local position = args[2] or Config.DefaultPosition
    
    ShowNotification({
        type = type,
        title = 'Test Notification',
        message = 'This is a test notification of type: ' .. type,
        position = position,
        duration = 5000
    })
end)

RegisterCommand('notifyinfo', function()
    ShowNotification({
        type = 'info',
        title = 'Information',
        message = 'This is an info notification',
        position = 'top-right'
    })
end)

RegisterCommand('notifysuccess', function()
    ShowNotification({
        type = 'success',
        title = 'Success',
        message = 'This is a success notification',
        position = 'top-left'
    })
end)

RegisterCommand('notifyerror', function()
    ShowNotification({
        type = 'error',
        title = 'Error',
        message = 'This is an error notification',
        position = 'bottom-right'
    })
end)

RegisterCommand('notifywarning', function()
    ShowNotification({
        type = 'warning',
        title = 'Warning',
        message = 'This is a warning notification',
        position = 'bottom-left'
    })
end)

RegisterCommand('notifycenter', function()
    ShowNotification({
        type = 'info',
        title = 'Centered',
        message = 'This is a centered notification',
        position = 'center'
    })
end)