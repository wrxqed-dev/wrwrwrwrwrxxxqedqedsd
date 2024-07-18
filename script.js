let coinCount = parseInt(localStorage.getItem('coinCount')) || 0;
let energyCount = parseInt(localStorage.getItem('energyCount')) || 10;
let maxEnergy = parseInt(localStorage.getItem('maxEnergy')) || 1000;
let clickValue = parseInt(localStorage.getItem('clickValue')) || 1;
document.getElementById('coin-count').innerText = coinCount + ' TRX';
document.getElementById('energy-count').innerText = `Energy: ${energyCount} / ${maxEnergy}`;

function updateEnergyBar() {
    const energyProgress = document.getElementById('energy-progress');
    energyProgress.style.width = (energyCount / maxEnergy) * 100 + '%';
}

document.getElementById('click-icon').addEventListener('click', function() {
    if (energyCount >= clickValue) {
        coinCount += clickValue;
        energyCount -= clickValue;
        document.getElementById('coin-count').innerText = coinCount + ' TRX';
        document.getElementById('energy-count').innerText = `Energy: ${energyCount} / ${maxEnergy}`;
        localStorage.setItem('coinCount', coinCount);
        localStorage.setItem('energyCount', energyCount);
        showAnimation('+' + clickValue + ' TRX');
        updateEnergyBar();
    } else {
        alert('Not enough energy!');
    }
});

document.getElementById('shop-button').addEventListener('click', function() {
    const modal = document.getElementById('shop-modal');
    document.getElementById('upgrade-cost').innerText = Math.pow(3, clickValue - 1) * 10;
    document.getElementById('energy-upgrade-cost').innerText = (maxEnergy / 2) * 10;
    modal.style.display = "flex";
});

document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('shop-modal').style.display = "none";
});

document.getElementById('buy-upgrade').addEventListener('click', function() {
    let upgradeCost = Math.pow(3, clickValue - 1) * 10;
    if (coinCount >= upgradeCost) {
        coinCount -= upgradeCost;
        clickValue++;
        document.getElementById('coin-count').innerText = coinCount + ' TRX';
        localStorage.setItem('coinCount', coinCount);
        localStorage.setItem('clickValue', clickValue);
        showPurchaseAnimation('Upgrade purchased!');
        document.getElementById('shop-modal').style.display = "none";
    } else {
        alert('Not enough TRX!');
    }
});

document.getElementById('buy-energy-upgrade').addEventListener('click', function() {
    let energyUpgradeCost = (maxEnergy / 2) * 10;
    if (coinCount >= energyUpgradeCost) {
        coinCount -= energyUpgradeCost;
        maxEnergy += 500;
        document.getElementById('coin-count').innerText = coinCount + ' TRX';
        document.getElementById('energy-count').innerText = `Energy: ${energyCount} / ${maxEnergy}`;
        localStorage.setItem('coinCount', coinCount);
        localStorage.setItem('maxEnergy', maxEnergy);
        showPurchaseAnimation('Energy upgrade purchased!');
        document.getElementById('shop-modal').style.display = "none";
        updateEnergyBar();
    } else {
        alert('Not enough TRX!');
    }
});

function showAnimation(text) {
    const animationContainer = document.getElementById('animation-container');
    const animation = document.createElement('div');
    animation.className = 'coin-animation';
    animation.innerText = text;
    animationContainer.appendChild(animation);
    setTimeout(() => {
        animationContainer.removeChild(animation);
    }, 1000);
}

function showPurchaseAnimation(text) {
    const animationContainer = document.getElementById('animation-container');
    const animation = document.createElement('div');
    animation.className = 'coin-animation';
    animation.innerText = text;
    animationContainer.appendChild(animation);
    setTimeout(() => {
        animationContainer.removeChild(animation);
    }, 1500);
}

setInterval(() => {
    if (energyCount < maxEnergy) {
        energyCount++;
        document.getElementById('energy-count').innerText = `Energy: ${energyCount} / ${maxEnergy}`;
        localStorage.setItem('energyCount', energyCount);
        updateEnergyBar();
    }
}, 2000);

updateEnergyBar();

window.Telegram.WebApp.ready();

const user = window.Telegram.WebApp.initDataUnsafe.user;
document.getElementById('user-name').innerText = user.first_name + ' ' + (user.last_name || '');
document.getElementById('user-photo').src = user.photo_url;
