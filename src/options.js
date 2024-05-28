import {
  getAnObjectFromLocalStorage,
  writeAnObjectToLocalStorage,
} from './chromeStorageHelper';
import { activate } from './lemonSqueezy';


const checkoutLink = 'https://nemo-crafting.lemonsqueezy.com/buy/8821e00a-f253-422d-8e40-29bea5757621';

async function init() {
  const isActivated = await getAnObjectFromLocalStorage('isActivated');
  const trialAttempt = await getAnObjectFromLocalStorage("trialAttempt");
  const activatedBanner = document.getElementById('activated-banner');
    const activationSection = document.getElementById('activation-section');
    const loveLetterElement = document.getElementById('love-letter');
  const isTrialAttemptUsedUp = Number(trialAttempt) === 0;
  if (isActivated) {
    activatedBanner.style.display = 'block';
    activationSection.style.display = 'none';
    loveLetterElement.style.display = 'none';
    return;
  }
  if (isTrialAttemptUsedUp) {
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
        checkoutLink,
        '_blank'
      );
    });
  });

  const loveLetterActivationForm = document.getElementById('love-letter-activation-form');
  loveLetterActivationForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const activationCode = document.getElementById('love-letter-activation-input').value;
    activate(activationCode).then(async (data) => {
      if (!data || data.errors) {
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
      if (!data || data.errors) {
        alert('Activation failed!');
        return;
      }
      await writeAnObjectToLocalStorage('isActivated', true);
      const activatedBanner = document.getElementById('activated-banner');
      const activationSection = document.getElementById('activation-section');
      activatedBanner.style.display =  'block';
      activationSection.style.display = 'none';
    });
  });  
  
}

init();
