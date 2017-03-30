(function(){
	"use strict";

	angular.module("app.services").factory('ToastService', function($mdToast){

		var delay = 3000,
			position = 'top right',
			action = 'OK';

		return {
			show: function(content){
				if (!content){
					return false;
				}

				return $mdToast.show(
					$mdToast.simple()
						.content(content)
						.position(position)
						.hideDelay(delay)
				);
			},
			withAction: function(content, actionText){
				if (!content){
					return false;
				}

				return $mdToast.show(
					$mdToast.simple()
						.content(content)
						.position(position)
						.action(actionText)
						.highlightAction(true)
						.hideDelay(delay * 1.5)
				);

			},
			error: function(content){
				if (!content){
					return false;
				}

				return $mdToast.show(
					$mdToast.simple()
						.content(content)
						.position(position)
						.theme('warn')
						.action(action)
						.hideDelay(delay)
				);
			}
		};
	});
})();
