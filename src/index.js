import ForSocket from './ForSocket';

/**
 * Vue component install.
 * @param Vue The Vue Object.
 * @param options Options
 */
const install = (Vue, options = {}) => {
	Vue.prototype.$forsocket = new ForSocket(options);
};

if (typeof window !== 'undefined' && window.Vue) {
	install(window.Vue);
}

export default {
	install
};
