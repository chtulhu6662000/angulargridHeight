ngGridFlexibleHeightPlugin = function(opts) {
    var self = this;
    self.grid = null;
    self.scope = null;

	var previousHeight = 0;
	var maxHeight = opts.maxHeight;
	if (!maxHeight) {maxHeight = 300;}

    self.init = function(scope, grid, services) {
        self.grid = grid;
        self.scope = scope;
        self.services = services;
        var recalcHeightForData = function () { setTimeout(innerRecalcForData, 1); } ;
        var innerRecalcForData = function () {
			var currentHeight = self.grid.$canvas.height();
			var height = currentHeight + self.grid.config.rowHeight + 5;

			// Avoid unnecessary rebuilding
			if (height < maxHeight || previousHeight < maxHeight) {
				height = Math.min(height, maxHeight);
				self.grid.$viewport.css('height', height + 'px');
				self.services.DomUtilityService.RebuildGrid(self.scope, self.grid);
				previousHeight = height;
			}
        };
        scope.$watch (grid.config.data, recalcHeightForData);
    };
};