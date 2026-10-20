import { initNavigation } from './navigation.js';
import { initContact } from './contact.js';

// Service and case pages share navigation/contact behavior, without a splash or carousel.
initNavigation(window.matchMedia('(prefers-reduced-motion: reduce)'));
initContact();
