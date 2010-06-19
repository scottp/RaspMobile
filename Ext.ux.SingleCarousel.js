// PURPOSE: Create a carousel like object, that does not change cards, just fires events
Ext.ns('Ext.ux');
Ext.ux.SingleCarousel = Ext.extend(Ext.Container, {
	baseCls: 'x-carousel',
    ui: null,
    initComponent: function() {
        // We want absolutely no laying out done, except for rendering
        this.layout = new Ext.layout.ContainerLayout();

        this.scroll = {
            bounces: false,
            momentum: false,
            horizontal: true,
            vertical: false
        };

		// XXX better name
        this.addEvents('cardswitch');

        Ext.Carousel.superclass.initComponent.call(this);
    },

    // @private
    afterRender: function() {
        Ext.Carousel.superclass.afterRender.call(this);

        this.scroller.on({
            touchend: this.onTouchEnd,
            scrollend: this.onScrollEnd,
            scope: this
        });
    },

    // @private
    afterLayout: function(layout) {
        var me = this,
            size = this.el.getSize(),
            items = this.items.items,
            ln = items.length,
            width = 0,
            i, item;

        for (i = 0; i < ln; i++) {
            item = items[i];
            item.show();
            item.setSize(size);
            width += size.width;
        }

        if (this.activeItem) {
            var item = this.activeItem;
            delete this.activeItem;
            this.setActiveItem(item, true);
        } else {
            this.setActiveItem(this.items.items[0]);
        }

        Ext.repaint();
    },

    /**
     * Sets one of the cards in the Carousel as active and optionally scrolls to it.
     * @param item {Mixed} The item to make active. This can be represented by an index, an  actual Ext.Component or an itemId/id.
     * @param scrollTo {Boolean} Pass true to scroll to the newly activated card. (Defaults to false)
     * @param animate {Boolean} Pass true to animate the scroll to the newly activated card. (Defaults to false)
     */
    setActiveItem: function(item, scrollTo, animate) {
		/*
        if (typeof item == 'number' || item == undefined) {
            item = this.items.items[item || 0];
        }
        else if (item && !item.isComponent) {
            item = this.getComponent(item);
        }
        if (item && this.activeItem != item) {
            if (this.activeItem) {
                this.activeItem.fireEvent('deactivate', this.activeItem, item);
            }
            item.fireEvent('activate', item, this.activeItem);
            var index = this.items.items.indexOf(item);
            this.activeItem = item;
            this.activeItemX = index * this.el.getWidth() * -1;
            if (scrollTo && this.activeItemX != this.scroller.offset.x) {
                this.scroller.scrollTo({x: this.activeItemX, y: 0}, animate ? 'ease-out' : false);
            }
            this.fireEvent('cardswitch', this, item, index);
        }
		*/
		var index = this.items.items.indexOf(0);
		this.activeItem = this.items.items[0];
		this.activeItemX = index * this.el.getWidth() * -1;
		if (scrollTo && this.activeItemX != this.scroller.offset.x) {
			this.scroller.scrollTo({x: this.activeItemX, y: 0}, animate ? 'ease-out' : false);
		}
		this.fireEvent('cardswitch', this, item, index);
    },

	// XXX set the ID, call event
    next: function(scrollTo, wrap, animate) {
        var items = this.items.items,
            index = items.indexOf(this.activeItem),
            next = items[index+1] || (wrap ? items[0] : false);
        if (next) {
            this.setActiveItem(next, scrollTo, animate);
        }
    },

	// XXX set the ID, call event
    previous: function(scrollTo, wrap, animate) {
        var items = this.items.items,
            index = items.indexOf(this.activeItem),
            prev = items[index-1] || (wrap ? items[items.length-1] : false);
        if (prev) {
            this.setActiveItem(prev, scrollTo, animate);
        }
    },

	// XXX set the ID, call event
    getActiveItem: function() {
        return this.activeItem;
    },

    // @private
    onTouchEnd: function(e, scroller) {
        var activeItemX = this.activeItemX,
            deltaX = scroller.offset.x - activeItemX,
            layout = this.layout,
            width = this.el.getWidth(),
            destX = activeItemX,
            duration = 2;
        // We are going to the right
        if (deltaX < 0 && Math.abs(deltaX) > 3 && e.previousDeltaX <= 0) {
            destX -= width;
        }
        // We are going to the left
        else if (deltaX > 0 && Math.abs(deltaX) > 3 && e.previousDeltaX >= 0) {
            destX += width;
        }
        scroller.scrollTo({x: destX, y: 0}, Math.min(duration * Math.abs(scroller.offset.x - destX), 350), 'ease-out');
    },

    // @private
    onScrollEnd: function(scroller) {
        var activeX = this.activeItemX,
            deltaX = scroller.offset.x - activeX,
            width = this.el.getWidth();

        // We have gone to the right
        if (deltaX < 0 && Math.abs(deltaX) > width / 2) {
            this.next();
        }
        // We have gone to the left
        else if (deltaX > 0 && Math.abs(deltaX) > width / 2) {
            this.previous();
        }
    }
});

Ext.reg('singlecarousel', Ext.ux.SingleCarousel);

