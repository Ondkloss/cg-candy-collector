const message = text => {
  chrome.runtime.sendMessage(text)
}

const reload = () => {
  message('reloading')
  location.reload()
}

const checkCandy = () => {
  const inputElement = document.querySelectorAll('button.collect-candy-button')[0]
  const divElement = document.querySelectorAll('div.collect-candy-button')[0]

  if (inputElement && inputElement.offsetParent) {
    message('clicking')
    inputElement.click()
    setTimeout(reload, 5000)
  }
  else if (divElement) {
    message('scouting')

    const cooldown = document.getElementById('next-daily-reward-countdown-timer')
    if (cooldown.innerHTML === '0:00:00') {
      reload()
    }
  }
  else {
    message('could not find expected elements')
  }
}

setInterval(checkCandy, 3600 * 1000)
checkCandy()
