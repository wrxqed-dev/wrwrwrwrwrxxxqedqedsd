let coinCount = parseInt(localStorage.getItem('coinCount')) || 0;
let energyCount = parseInt(localStorage.getItem('energyCount')) || 1000;
let clickValue = parseInt(localStorage.getItem('clickValue')) || 1;
let upgradeCost = parseInt(localStorage.getItem('upgradeCost')) || 50;

const lastEnergyUpdate = parseInt(localStorage.getItem('lastEnergyUpdate')) || Date.now();
updateEnergyOnLoad(lastEnergyUpdate);

document.getElementById('coin-count').innerText = coinCount + ' TRX';
document.getElementById('energy-count').innerText = energyCount;
document.getElementById('energy-bar-fill').style.width = (energyCount / 10) + '%';
document.getElementById('upgrade-click').innerText = `Upgrade Click (Cost: ${upgradeCost} TRX)`;

document.getElementById('click-icon').addEventListener('click', function() {
    if (energyCount >= clickValue) {
        coinCount += clickValue;
        energyCount -= clickValue;
        document.getElementById('coin-count').innerText = coinCount + ' TRX';
        document.getElementById('energy-count').innerText = energyCount;
        document.getElementById('energy-bar-fill').style.width = (energyCount / 10) + '%';
        localStorage.setItem('coinCount', coinCount);
        localStorage.setItem('energyCount', energyCount);
        showAnimation('+' + clickValue + ' TRX');
    } else {
        showAnimation('Нет энергии');
    }
});

document.getElementById('shop-button').addEventListener('click', function() {
    document.getElementById('shop-modal').style.display = "block";
});

document.getElementById('close-shop').addEventListener('click', function() {
    document.getElementById('shop-modal').style.display = "none";
});

document.getElementById('upgrade-click').addEventListener('click', function() {
    if (coinCount >= upgradeCost) {
        coinCount -= upgradeCost;
        clickValue *= 2;
        upgradeCost *= 3;
        document.getElementById('coin-count').innerText = coinCount + ' TRX';
        document.getElementById('upgrade-click').innerText = `Upgrade Click (Cost: ${upgradeCost} TRX)`;
        localStorage.setItem('coinCount', coinCount);
        localStorage.setItem('clickValue', clickValue);
        localStorage.setItem('upgradeCost', upgradeCost);
    } else {
        showAnimation('Недостаточно TRX');
    }
});

function showAnimation(text) {
    const animation = document.createElement('div');
    animation.className = 'coin-animation';
    animation.innerText = text;
    document.getElementById('animation-container').appendChild(animation);
    setTimeout(() => {
        document.getElementById('animation-container').removeChild(animation);
    }, 1000);
}

function updateEnergy() {
    if (energyCount < 1000) {
        energyCount += 1;
        if (energyCount > 1000) {
            energyCount = 1000;
        }
        document.getElementById('energy-count').innerText = energyCount;
        document.getElementById('energy-bar-fill').style.width = (energyCount / 10) + '%';
        localStorage.setItem('energyCount', energyCount);
        localStorage.setItem('lastEnergyUpdate', Date.now());
    }
}

function updateEnergyOnLoad(lastUpdate) {
    const now = Date.now();
    const elapsedSeconds = Math.floor((now - lastUpdate) / 2000); // 1 энергия каждые 2 секунды
    if (elapsedSeconds > 0) {
        energyCount += elapsedSeconds;
        if (energyCount > 1000) {
            energyCount = 1000;
        }
        document.getElementById('energy-count').innerText = energyCount;
        document.getElementById('energy-bar-fill').style.width = (energyCount / 10) + '%';
        localStorage.setItem('energyCount', energyCount);
        localStorage.setItem('lastEnergyUpdate', now);
    }
}

setInterval(updateEnergy, 2000);
