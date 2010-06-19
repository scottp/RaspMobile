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

// ======================================================================
// The main application
rasp.Main = {
    init : function() {

		// --------------------------------------------------
		// Time
		/*
		this.timeSpinner = new Ext.form.Select({
			label: 'Time',
			hidden: true,
			options: [
				// TODO - better configuration
				{text: '08:00', value: '0800'},
				{text: '09:00', value: '0900'},
				{text: '10:00', value: '1000'},
				{text: '11:00', value: '1100'},
				{text: '12:00', value: '1200'},
				{text: '13:00', value: '1300'},
				{text: '14:00', value: '1400'},
				{text: '15:00', value: '1500'},
				{text: '16:00', value: '1600'},
				{text: '17:00', value: '1700'},
				{text: '18:00', value: '1800'},
				{text: '19:00', value: '1900'},
				{text: '20:00', value: '2000'}
			]
		});
		*/

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
            // buttons: [this.timeSpinner, {xtype: 'spacer'}, this.helpButton],
            buttons: [{xtype: 'spacer'}, this.helpButton],
            listeners: {
                navigate : this.onNavigate,
                scope: this
            },
			items: [
				{
					cls: 'launchscreen',
					scroll: true,
					html: '<div><h1>Really... Welcome to RASP</h1><p>Example code</p></div>'
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

        if (item.description) {
            if (this.helpButton.hidden) {
                this.helpButton.show();
                // this.timeSpinner.show();
                ui.navigationBar.doComponentLayout();
            }
			// XXX this.codeBox.setValue(Ext.htmlEncode(response.responseText));
        }
        else {
            // this.codeBox.setValue('No help for this example.');
            this.helpButton.hide();
            // this.timeSpinner.hide();
            this.helpActive = false;
            this.helpButton.setText('Info');
            ui.navigationBar.doComponentLayout();
        }
    },
    
	// XXX rename Info
    onHelpButtonTap : function() {
        if (!Ext.platform.isPhone) {
            this.helpPanel.showBy(this.helpButton.el, 'fade');
            // this.helpPanel.showBy(this.timeSpinner.el, 'fade');
        }
        else {
            if (this.helpActive) {
                this.ui.setCard(this.ui.currentCard, Ext.platform.isAndroidOS ? false : 'flip');
                this.helpActive = false;
                this.ui.navigationBar.setTitle(this.currentTitle);
                this.helpButton.setText('Info');
            }
            else {
                this.ui.setCard(this.helpPanel, Ext.platform.isAndroidOS ? false : 'flip');
                this.helpActive = true;
                this.currentTitle = this.ui.navigationBar.title;
                // this.ui.navigationBar.setTitle('Help');
                this.helpButton.setText('View');
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
