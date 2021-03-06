'use strict';

define('admin/plugins/dice', ['settings', 'autocomplete'], function (Settings, autocomplete) {
	var ACP = {};

	ACP.init = function () {
		Settings.load('dice', $('.dice-settings'));
		var $botUsername = $('#botUsername');
		var $botUid = $('#botUid');

		autocomplete.user($botUsername, function (ev, ui) {
			$botUid.val(ui.item.user.uid);
		});

		$('#save').on('click', function() {
			$botUid.attr('disabled', null);

			Settings.save('dice', $('.dice-settings'), function() {
				$botUid.attr('disabled', 'disabled');

				app.alert({
					type: 'success',
					alert_id: 'dice-saved',
					title: 'Settings Saved',
					message: 'Please reload your NodeBB to apply these settings',
					clickfn: function () {
						socket.emit('admin.reload');
					}
				});
			});
		});
	};

	return ACP;
});
