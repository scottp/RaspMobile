/*
from: 		Sencha Touch examples/kitchensink
purpose: 	A general interface to allow cross layout (iPhone, iPad, Android,
			landscape/portrait) while maintaining only a single bit of code.
note:		This has been modified by me - Scott Penrose
license:	GNU 3


	- iPad landscape
	  	. Split view
	- iPad portrait
	  	. Navigation button (popover)
	- iPhone (portrait / landscape ?)
		. Back button to navigation
	  	
*/

Ext.ns('Ext.ux');
Ext.ux.UniversalUI = Ext.extend(Ext.Panel, {
    fullscreen: true,
    layout: 'card',
    initComponent : function() {
        this.backButton = new Ext.Button({
            hidden: true,
            text: 'Back',
            ui: 'back',
            handler: this.onBackButtonTap,
            scope: this
        });

        this.navigationButton = new Ext.Button({
            hidden: Ext.platform.isPhone || Ext.orientation == 'landscape',
            text: 'Navigation',
            handler: this.onNavButtonTap,
            scope: this
        });
        
        this.navigationBar = new Ext.Toolbar({
            ui: 'dark',
            dock: 'top',
            title: this.title,
            items: [this.backButton, this.navigationButton].concat(this.buttons || [])
        });
        
        this.navigationPanel = new Ext.NestedList({
            items: this.navigationItems || [],
            dock: 'left',
            width: 250,
            height: 456,
            hidden: !Ext.platform.isPhone && Ext.orientation == 'portrait',
            toolbar: Ext.platform.isPhone ? this.navigationBar : null,
            listeners: {
                listchange: this.onListChange,
                scope: this
            }
        });
        
        this.dockedItems = this.dockedItems || [];
        this.dockedItems.unshift(this.navigationBar);
        
        if (!Ext.platform.isPhone && Ext.orientation == 'landscape') {
            this.dockedItems.unshift(this.navigationPanel);
        }
        else if (Ext.platform.isPhone) {
            this.items = this.items || [];
            this.items.unshift(this.navigationPanel);
        }
        
        this.addEvents('navigate');
        
        Ext.ux.UniversalUI.superclass.initComponent.call(this);
    },
    
    onListChange : function(list, item) {
        if (Ext.orientation == 'portrait' && !Ext.platform.isPhone && !item.items && !item.preventHide) {
            this.navigationPanel.hide();
        }
        
        if (item.rasp_id) {
			/* XXX if item.id
				- set the right ID for the type of image to display
				- and fire the navigate
			 */
			// XXX where is setCard?
			var card = rasp.View;
            this.setCard(card, item.animation || 'slide');
            this.currentCard = card;

			// XXX where from
			this.currentItem = item;
			this.currentId = item.rasp_id;
			this.currentTitle = item.text;
			this.currentDescription = item.description;

			///alert(this.currentId + ' ' + this.currentTitle);

            if (item.text) {
                this.navigationBar.setTitle(item.text);
            }

            if (Ext.platform.isPhone) {
                this.backButton.show();
                this.navigationBar.doLayout();
            }
        }
       
        this.fireEvent('navigate', this, item, list);
    },
    
    onNavButtonTap : function() {
        this.navigationPanel.showBy(this.navigationButton, 'fade');
    },
    
    onBackButtonTap : function() {
        this.setCard(this.navigationPanel, {type: 'slide', direction: 'right'});
        this.currentCard = this.navigationPanel;
        if (Ext.platform.isPhone) {
            this.backButton.hide();
            this.navigationBar.setTitle(this.title);
            this.navigationBar.doLayout();
        }
        this.fireEvent('navigate', this, this.navigationPanel.activeItem, this.navigationPanel);
    },
    
    onOrientationChange : function(orientation, w, h) {
        Ext.ux.UniversalUI.superclass.onOrientationChange.call(this, orientation, w, h);
        
        if (!Ext.platform.isPhone) {
            if (orientation == 'portrait') {
                this.removeDocked(this.navigationPanel, false);
                this.navigationPanel.hide();
                this.navigationPanel.setFloating(true);
                this.navigationButton.show();
            }
            else {                
                this.navigationPanel.setFloating(false);
                this.navigationPanel.show();
                this.navigationButton.hide();
                this.insertDocked(0, this.navigationPanel);                
            }

            this.doComponentLayout();
            this.navigationBar.doComponentLayout();
        }
    }
});

