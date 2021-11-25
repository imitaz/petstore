define(['jquery','mage/translate','underscore','Magento_Catalog/js/product/view/product-ids-resolver','jquery-ui-modules/widget', 'jquery/ui',
'Magento_Ui/js/modal/modal',], 

function($,$t,_,idsResolver,modal){
	
	
	'use strict';
	

			 
	$.widget('mage.catalogAddToCart',{options:{processStart:null,processStop:null,bindSubmit:true,minicartSelector:'[data-block="minicart"]',messagesSelector:'[data-placeholder="messages"]',productStatusSelector:'.stock.available',addToCartButtonSelector:'.action.tocart',addToCartButtonDisabledClass:'disabled',addToCartButtonTextWhileAdding:'',addToCartButtonTextAdded:'',addToCartButtonTextDefault:''},_create:function(){if(this.options.bindSubmit){this._bindSubmit();}},_bindSubmit:function(){var self=this;if(this.element.data('catalog-addtocart-initialized')){return;}
this.element.data('catalog-addtocart-initialized',1);this.element.on('submit',function(e){e.preventDefault();self.submitForm($(this));});},_redirect:function(url){var urlParts,locationParts,forceReload;urlParts=url.split('#');locationParts=window.location.href.split('#');forceReload=urlParts[0]===locationParts[0];window.location.assign(url);if(forceReload){window.location.reload();}},isLoaderEnabled:function(){return this.options.processStart&&this.options.processStop;},submitForm:function(form){this.ajaxSubmit(form);},

ajaxSubmit: function (form) {
        var self = this;

        $(self.options.minicartSelector).trigger('contentLoading');
        self.disableAddToCartButton(form);

        $.ajax({
            url: form.attr('action'),
            data: form.serialize(),
            type: 'post',
            dataType: 'json',

            /** @inheritdoc */
            success: function (res) {
               
                /** add to cart popup modal **/
                var popup = $('.model-popup').modal({
                    modalClass: 'changelog',
                    });
                popup.modal('openModal');
                $('.modal-footer').hide();
                $('.modal-inner-wrap').addClass('checkoutpopup');
                $('.action-close').click(function() {
                  $('.modal-inner-wrap').removeClass('checkoutpopup');
                });
                $('button').click(function() {
                  $('.modal-inner-wrap').removeClass('checkoutpopup');
                });  
                /** add to cart popup**/
            }
        });
    }


,disableAddToCartButton:function(form){var addToCartButtonTextWhileAdding=this.options.addToCartButtonTextWhileAdding||$t('Adding...'),addToCartButton=$(form).find(this.options.addToCartButtonSelector);addToCartButton.addClass(this.options.addToCartButtonDisabledClass);addToCartButton.find('span').text(addToCartButtonTextWhileAdding);addToCartButton.attr('title',addToCartButtonTextWhileAdding);},enableAddToCartButton:function(form){var addToCartButtonTextAdded=this.options.addToCartButtonTextAdded||$t('Added'),self=this,addToCartButton=$(form).find(this.options.addToCartButtonSelector);addToCartButton.find('span').text(addToCartButtonTextAdded);addToCartButton.attr('title',addToCartButtonTextAdded);setTimeout(function(){var addToCartButtonTextDefault=self.options.addToCartButtonTextDefault||$t('Add to Cart');addToCartButton.removeClass(self.options.addToCartButtonDisabledClass);addToCartButton.find('span').text(addToCartButtonTextDefault);addToCartButton.attr('title',addToCartButtonTextDefault);},1000);}});return $.mage.catalogAddToCart;});

