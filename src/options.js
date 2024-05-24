import {
  getAnObjectFromLocalStorage,
  writeAnObjectToLocalStorage,
} from './chromeStorageHelper';
import { activate, validate } from './lemonSqueezy';

async function checkIfActivated() {
  const licenseKey = await getAnObjectFromLocalStorage('licenseKey');
  const instanceId = await getAnObjectFromLocalStorage('instanceId');
  if (licenseKey && instanceId) {
    const response = await validate(licenseKey, instanceId);
    if (response.status === 200) {
      return true;
    }
  }
  return false;
}

async function init() {
  const trialAttempt = await getAnObjectFromLocalStorage("trialAttempt");
  const activatedBanner = document.getElementById('activated-banner');
    const activationSection = document.getElementById('activation-section');
    const loveLetterElement = document.getElementById('love-letter');
  const isTrialAttemptUsedUp = Number(trialAttempt) === 0;
  if (isTrialAttemptUsedUp) {
    const isActivated = await checkIfActivated();
    if (!isActivated) {
      alert('Please activate the extension to use this feature');
    }
    
    activationSection.style.display = isActivated ? 'none' : 'block';
    activatedBanner.style.display = isActivated ? 'block' : 'none';
    loveLetterElement.style.display = 'none';
  } else {
    
    loveLetterElement.style.display = 'block';
  }
  const payButtons = document.getElementsByClassName('pay-button');
  Array.from(payButtons).forEach((payButton) => {
    payButton.addEventListener('click', () => {
      window.open(
        'https://nemo-crafting.lemonsqueezy.com/buy/d620d023-2cc7-4d00-8f3f-918ca77e3001',
        '_blank'
      );
    });
  });
  
  

  const loveLetterActivationForm = document.getElementById('love-letter-activation-form');
  loveLetterActivationForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const activationCode = document.getElementById('love-letter-activation-input').value;
    activate(activationCode).then(async (data) => {
      if (!data || data.error) {
        alert('Activation failed!');
        return;
      }
      await writeAnObjectToLocalStorage('isActivated', true);
      const activatedBanner = document.getElementById('activated-banner');
      const loveLetter = document.getElementById('love-letter');
      activatedBanner.style.display =  'block';
      loveLetter.style.display = 'none';
    });
  });  
  

  const activationForm = document.getElementById('activation-form');
  activationForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const activationCode = document.getElementById('activation-input').value;
    activate(activationCode).then(async (data) => {
      if (!data || data.error) {
        alert('Activation failed!');
        return;
      }
      const { license_key, instance } = data;
      await writeAnObjectToLocalStorage('licenseKey', license_key.key);
      await writeAnObjectToLocalStorage('instanceId', instance.id);
      const activatedBanner = document.getElementById('activated-banner');
      const activationSection = document.getElementById('activation-section');
      activatedBanner.style.display =  'block';
      activationSection.style.display = 'none';
    });
  });  
  
}

init();
