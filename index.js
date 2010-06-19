Ext.ns('rasp');

// Find the URL (which server?) - could assume local
//	XXX add /loc/FCST directories to NETWORK section of MANIFEST
rasp.ImageURL = function(loc, day, type, time) {
	var day_prefix = '';
	// return "http://glidingforecast.on.net/RASP/" 
	return "local/"
		+ loc
		+ "/FCST/"
		+ day_prefix
		+ type
		+ ".curr."
		+ time
		+ "lst.d2.png";
};

// The main application
rasp.Main = {
    init : function() {

		// --------------------------------------------------
		// XXX rework as info button
        this.helpButton = new Ext.Button({
            text: 'Info',
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
        
		// --------------------------------------------------
		// Selection and orientatin framework
        this.ui = new Ext.ux.UniversalUI({
            title: 'RASP', //Ext.platform.isPhone ? 'RASP' : 'Longer RASP',
            navigationItems: RASP.types,
            buttons: [{xtype: 'spacer'}, this.helpButton],
            listeners: {
                navigate : this.onNavigate,
                scope: this
            },
			items: [
				{
					cls: 'launchscreen',
					scroll: true,
					html: '<div><h1>Really... Welcome to RASP</h1><p>Example code</p><img src="" id="theimage" /></div>'
				}
			]
        });
    },
    
	// -------------------------------------------------------
	// Triggered navigation change
    onNavigate : function(ui, item) {
		// Set the RASP Image
		if (item.rasp_id) {
			// (loc, day, type, time)
			// XXX - How to make this zoom and scroll able
			Ext.get('theimage').dom.src = rasp.ImageURL('VIC', 'current', item.rasp_id, '1200');
		}

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
    
	// XXX rename Info
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

// ----------------------------------------------------------------------
// Standard application setup
Ext.setup({
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    icon: 'icon.png',
    glossOnIcon: false,
    
    onReady: function() {
        rasp.Main.init();
    }
});
