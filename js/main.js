$(document).ready(function() {
	var ENTER_KEY_CODE = 13;
	var ESC_KEY_CODE = 27
	var SKILL_TYPES = ['Strong', 'Middle', 'Low'];
	var SKILLS_LVL_CLASSES = {
		STRONG: 'bg-b',
		MIDDLE: 'bg-dgrey',
		LOW: 'bg-lgrey'
	}
	var skillCounter = 0;
	var inputInitialValue;
	var inputFlag = false;


	function checkUserInput(userInputValue) {
		if (!userInputValue) {
			alert('The field can not be empty. Please, fill in the fields according to the prompts!')
		}
	}

	function submitUserSkillInput() {
		var skillInputValue = $('.skill-input').val().toUpperCase();
		var skillInputTypeValue = $('.skill-value').val();
		var newElement = $('.skill-template').clone(true);
		$(newElement).removeClass('skill-template');
		$(newElement).find('span').text(skillInputValue);

		switch (skillInputTypeValue) {
			case 'Strong':
				$(newElement).addClass(SKILLS_LVL_CLASSES.STRONG);
				break;
			case 'Middle':
				$(newElement).addClass(SKILLS_LVL_CLASSES.MIDDLE);
				break;
			case 'Low':
				$(newElement).addClass(SKILLS_LVL_CLASSES.LOW);
		}

		if (skillInputValue.trim()) {
			$('.info .skills-list').append(newElement)
			$('.skill-input').val('');
			$('.skills-ib').removeClass('open');
		} else {
			alert('Please, enter any skill own.');			
		}	
	}


	$('.input-box').focusin(function() {
		inputInitialValue = $(this).find('.user-input').val();
		inputInitialValue.trim();
		$(this).addClass('open');		
	});

	$('.input-box').focusout(function() {
		var currentUserInput = $(this).find('.user-input').val();	
		if (inputFlag) {
			checkUserInput(currentUserInput.trim());
			$(this).removeClass('open');		
			$(this).find('.user-input').val(currentUserInput.trim());	
		} else {
			$(this).find('.user-input').val(inputInitialValue.trim());
			$(this).removeClass('open');			
		}
		inputFlag = false;
	});

	$('.submit-input').mousedown('click', function() {
		inputFlag = true;		
	});

	$('.user-input').keyup(function(e) {
    	if (e.keyCode == ENTER_KEY_CODE) {
    		inputFlag = true;
	       $(this).blur();
    	}

    	if (e.keyCode == ESC_KEY_CODE) {
	       $(this).blur();
    	}
	});

	$('.rm-btn').click(function() {		
		$(this).parent().remove();
	});

	$('.skills-ib').focusin(function() {
		$(this).addClass('open');
	});

	$('.skills-ib').focusout(function() {
		$(this).removeClass('open');
	})

	$('.value-up').click(function() {
		skillCounter++;

		if (skillCounter > SKILL_TYPES.length - 1) {
			skillCounter = SKILL_TYPES.length - 1;
			$('.skill-value').val(SKILL_TYPES[skillCounter]);
		} else {			
			$('.skill-value').val(SKILL_TYPES[skillCounter]);
		}
	});

	$('.value-down').click(function() {
		skillCounter--;

		if (skillCounter < 0) {
			skillCounter = 0;
			$('.skill-value').val(SKILL_TYPES[skillCounter]);
		} else {			
			$('.skill-value').val(SKILL_TYPES[skillCounter]);
		}
	});

	$('.skills-ib .submit-input').mousedown(submitUserSkillInput);

	$('.skill-input').keyup(function(e) {
    	if (e.keyCode == ENTER_KEY_CODE) {
    		submitUserSkillInput();
    		$(this).blur();
    	}

    	if (e.keyCode == ESC_KEY_CODE) {
    		$('.skill-ib').removeClass('open');
    		$(this).val('')
	       	$(this).blur();
    	}
	});	

	$('.skill-input').focusout(function(){
		$(this).val('');
	});
});