import ForSocket from './ForSocket';

/**
 * Vue component install.
 * @param Vue The Vue Object.
 * @param options Options
 */
const install = function(Vue, options = {}) {
	const forsocket = new ForSocket(options);
	Vue.forsocket = forsocket;
	Vue.prototype.$forsocket = forsocket;
};

if (typeof window !== 'undefined' && window.Vue) {
	install(window.Vue);
}

export default {
	install,
	ForSocket
};
