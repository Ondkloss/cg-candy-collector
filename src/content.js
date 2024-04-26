const message = text => {
  chrome.runtime.sendMessage(text)
}

const reload = () => {
  message('reloading')
  location.reload()
}

const checkCandy = () => {
  const buttonElement = document.getElementById('collectButton')

  if (buttonElement && !buttonElement.disabled) {
    message('clicking')
    buttonElement.click()
    setTimeout(reload, 5000)
  }
  else if (buttonElement && buttonElement.disabled) {
    message('scouting')
    const cooldown = buttonElement.firstElementChild
    if (cooldown?.innerHTML && cooldown.innerHTML.startsWith('0:00:00')) {
      reload()
    }
  }
  else {
    message('could not find expected elements')
  }
}

setInterval(checkCandy, 3600 * 1000)
setTimeout(checkCandy, 5000)
