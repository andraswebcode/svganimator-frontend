const defaults = {
	VAppBar: {
		density: 'compact',
		VBtn: {
			class: 'mx-1',
			size: 'x-small'
		},
		VDivider: {
			class: 'mx-1'
		}
	},
	VMenu: {
		VList: {
			nav: true,
			lines: false,
			density: 'compact'
		},
		VIcon: {
			size: 'x-small'
		}
	},
	VNavigationDrawer: {
		VList: {
			nav: true,
			lines: false,
			density: 'compact'
		},
		VIcon: {
			size: 'x-small'
		},
		VTextField: {
			density: 'compact',
			variant: 'underlined'
		}
	},
	VCard: {
		VTextField: {
			density: 'comfortable'
		},
		VBtn: {
			size: 'large',
			variant: 'flat',
			color: 'primary'
		}
	},
	VSlider: {
		thumbSize: 15,
		trackSize: 2,
		VBtn: {
			density: 'comfortable',
			size: 'x-small',
			rounded: true
		}
	},
	VTreeview: {
		density: 'compact'
	},

	// Custom components.
	ToolBarList: {
		style: {
			display: 'block',
			height: 'auto'
		}
	},
	ToolBarItem: {
		block: true,
		VIcon: {
			size: 'default'
		}
	},
	SideBarToggler: {
		class: 'sidebar-toggler',
		position: 'absolute',
		rounded: false,
		flat: true,
		density: 'compact'
	}
};

export default defaults;
