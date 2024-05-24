let LAST_TIME = Number.MAX_VALUE

const message = text => {
  chrome.runtime.sendMessage(text)
}

const reload = () => {
  location.reload()
}

const calculateSecondsRemaining = text => {
  const timePart = text.split(' ')[0]
  const hhmmss = timePart.split(':');
  const seconds = ((+hhmmss[0]) * 60 * 60) + ((+hhmmss[1]) * 60) + (+hhmmss[2]);
  return seconds
}

const checkCandy = () => {
  const buttonElement = document.getElementById('collectButton')

  if (buttonElement && !buttonElement.disabled) {
    message('clicking')
    buttonElement.click()
    message('reloading')
    setTimeout(reload, 5000)
  }
  else if (buttonElement && buttonElement.disabled) {
    message('scouting')
    const cooldown = buttonElement.firstElementChild

    if (cooldown?.innerHTML) {
      const seconds = calculateSecondsRemaining(cooldown.innerHTML)

      if (LAST_TIME < seconds) {
        message('reloading')
        reload()
      }
      else {
        message(`${seconds} seconds remaining`)
        LAST_TIME = seconds
      }
    }
    else {
      message('missing cooldown element')
    }
  }
  else {
    message('missing button element')
  }
}

setInterval(checkCandy, 3600 * 1000)
setTimeout(checkCandy, 5000)
