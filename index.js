Ext.ns('rasp');

rasp.Main = {
    init : function() {
        this.helpButton = new Ext.Button({
            text: 'Help',
            ui: 'action',
            hidden: true,
            handler: this.onHelpButtonTap,
            scope: this
        });
        
        var helpConfig = {
            items: [{
				html: '<h1>Hello help</h1>'
			}],
            scroll: 'vertical'
        };

        if (!Ext.platform.isPhone) {
            Ext.apply(helpConfig, {
                width: 500,
                height: 500,
                floating: true
            });
        }
                
        this.helpPanel = new Ext.Panel(helpConfig);
        
        this.ui = new Ext.ux.UniversalUI({
            title: Ext.platform.isPhone ? 'Lode' : 'Real Lode',
            navigationItems: RASP.types,
            buttons: [{xtype: 'spacer'}, this.helpButton],
            listeners: {
                navigate : this.onNavigate,
                scope: this
            },
			items: [
				{
					cls: 'launchscreen',
					html: '<div><h1>Really... Welcome to Lode</h1><p>Example code</p></div>'
				}
			]
        });
    },
    
    onNavigate : function(ui, item) {
        if (item.help) {
            if (this.helpButton.hidden) {
                this.helpButton.show();
                ui.navigationBar.doComponentLayout();
            }
            
            Ext.Ajax.request({
                url: item.help,
                success: function(response) {
                    // this.codeBox.setValue(Ext.htmlEncode(response.responseText));
                },
                scope: this
            });
        }
        else {
            // this.codeBox.setValue('No help for this example.');
            this.helpButton.hide();
            this.helpActive = false;
            this.helpButton.setText('Help');
            ui.navigationBar.doComponentLayout();
        }
    },
    
    onHelpButtonTap : function() {
        if (!Ext.platform.isPhone) {
            this.helpPanel.showBy(this.helpButton.el, 'fade');
        }
        else {
            if (this.helpActive) {
                this.ui.setCard(this.ui.currentCard, Ext.platform.isAndroidOS ? false : 'flip');
                this.helpActive = false;
                this.ui.navigationBar.setTitle(this.currentTitle);
                this.helpButton.setText('Help');
            }
            else {
                this.ui.setCard(this.helpPanel, Ext.platform.isAndroidOS ? false : 'flip');
                this.helpActive = true;
                this.currentTitle = this.ui.navigationBar.title;
                this.ui.navigationBar.setTitle('Help');
                this.helpButton.setText('Example');
            }
            this.ui.navigationBar.doLayout();
        }
        this.helpPanel.scroller.scrollTo({x: 0, y: 0});
    }
};

Ext.setup({
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    icon: 'icon.png',
    glossOnIcon: false,
    
    onReady: function() {
        rasp.Main.init();
    }
});
