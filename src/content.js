const output = text => {
  console.log(new Date().toISOString(), 'CoinGecko Coin Collector:', text)
}

const checkCandy = () => {
  const ele = document.getElementsByClassName('collect-candy-button')[0]
  if (ele.tagName === 'INPUT') {
    output('clicking')
    ele.click()
    setTimeout(location.reload, 5000)
  }
  else if (ele.tagName === 'DIV') {
    output('scouting')

    const cd = document.getElementById('next-daily-reward-countdown-timer')
    if (cd.innerHTML === '0:00:00') {
      location.reload()
    }
  }
  else {
    output('could not find expected elements')
  }
}

setInterval(checkCandy, 3600 * 1000)
checkCandy()
