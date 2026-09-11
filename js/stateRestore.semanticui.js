/*! StateRestore Semantic UI styling 2.0.0-dev for DataTables
 * Copyright (c) SpryMedia Ltd - datatables.net/license
 */

(function(factory){
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['datatables.net-se', 'datatables.net-staterestore'], function (dt) {
			return factory(window, document, dt);
		});
	}
	else if (typeof exports === 'object') {
		// CommonJS
		var cjsRequires = function (root) {
			if (! root.DataTable) {
				require('datatables.net-se')(root);
			}

			if (! window.DataTable.StateRestore) {
				require('datatables.net-staterestore')(root);
			}
		};

		if (typeof window === 'undefined') {
			module.exports = function (root) {
				if (! root) {
					// CommonJS environments without a window global must pass a
					// root. This will give an error otherwise
					root = window;
				}

				cjsRequires(root);
				return factory(root, root.document, root.DataTable);
			};
		}
		else {
			cjsRequires(window);
			module.exports = factory(window, window.document, window.DataTable);
		}
	}
	else {
		// Browser
		factory(window, document, window.DataTable);
	}
}(function(window, document, DataTable) {
'use strict';

var Dom = DataTable.Dom;
var util = DataTable.util;

let fModal;
const StateRestore = DataTable.StateRestore;
const _modal = Dom.c('div')
    .classAdd('ui modal dtsr-modal')
    .append(Dom.c('i').classAdd('close icon'))
    .append(Dom.c('div').classAdd('header'))
    .append(Dom.c('div').classAdd('content'));
/*
 * Bootstrap modal for StateRestore.
 */
StateRestore.modal = function (title, content, className, closeCb) {
    let $ = DataTable.use('jq');
    if (!fModal) {
        fModal = $(_modal.get(0))
            .appendTo('body')
            .modal('setting', {
            closable: false,
            onVisible: function () {
                let t = $(_modal).find('table');
                if (t.length) {
                    new DataTable.Api(t).columns.adjust();
                }
            }
        });
    }
    let header = _modal.find('div.header');
    let body = _modal.find('div.content');
    let close = _modal.find('i.close');
    // Display the content
    header.text(title);
    body.append(content);
    _modal.classAdd(className);
    // Close event handler
    close.on('click.dtsr', (e) => {
        e.stopPropagation();
        closeCb();
    });
    $(document)
        .on('click.dtsr', 'div.ui.dimmer.modals', function (e) {
        if ($(e.target).hasClass('dimmer')) {
            closeCb();
        }
    });
    fModal.modal('show');
};
StateRestore.modalClean = function () {
    let $ = DataTable.use('jq');
    let header = _modal.find('div.header');
    let body = _modal.find('div.content');
    let close = _modal.find('i.close');
    header.text('');
    body.empty();
    _modal.classRemove(StateRestore.classes.modal.table);
    close.off('.dtsr');
    $(document).off('.dtsr');
};
StateRestore.modalClose = function () {
    if (fModal) {
        fModal.modal('hide');
    }
};
/*
 * Setup classes for integration
 */
util.object.assignDeep(StateRestore.classes, {
    field: {
        checkboxOption: 'ui checkbox',
        container: 'field',
        error: 'ui error text',
        info: 'ui info text',
        label: '',
        value: '',
        input: {
            checkbox: 'form-check-input',
            text: 'form-control'
        }
    },
    form: 'ui form',
    modal: {
        button: 'ui button',
        table: 'large',
        form: 'small'
    },
    table: {
        table: 'ui selectable striped celled table',
        button: 'small ui button'
    }
});


return DataTable;
}));
