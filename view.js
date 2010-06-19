// A viewer for the images... needs scroll, zoom, info button etc
rasp.View = new Ext.Panel({
	title: 'Viewer',
	// Scroll working, Zoom not
	scroll: {
		bounces: true,
		momentum: true,
		horizontal: true,
		vertical: true
	},
	// Some better notes, better way of adding image etc
	html: '<h1>TODO viewer</h1><img src="" id="theimage" />',
	dockedItems: [
		{
			xtype: 'toolbar',
			dock: 'bottom',
			/* Presentation ideas
				Consider moving Location & Day to front page only
				Then having just Time here.
				Better to have time in heaer, but runs out of space on iPhone.
			 */
			// XXX get fid of this - use a carosel type swipe !
			items: [
				{
					label: 'Time',
					xtype: 'select',
					id: 'select_time',
					value: '1200',
					options: [
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
				}
			]
		}
	]
});

