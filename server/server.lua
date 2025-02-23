function ShowNotification(source, data)
    TriggerClientEvent('kp-notify:showNotification', source, data)
end

exports('ShowNotification', ShowNotification)