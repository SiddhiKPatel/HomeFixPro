$(document).ready(function () {
	var currentGfgStep, nextGfgStep, previousGfgStep;
	var opacity;
	var current = 1;
	var steps = $("fieldset").length;

	setProgressBar(current);

	$(".next-step").click(function () {

		currentGfgStep = $(this).parent();
		nextGfgStep = $(this).parent().next();

		$("#progressbar li").eq($("fieldset")
			.index(nextGfgStep)).addClass("active");

		nextGfgStep.show();
		currentGfgStep.animate({ opacity: 0 }, {
			step: function (now) {
				opacity = 1 - now;

				currentGfgStep.css({
					'display': 'none',
					'position': 'relative'
				});
				nextGfgStep.css({ 'opacity': opacity });
			},
			duration: 500
		});
		setProgressBar(++current);
	});

	$(".previous-step").click(function () {

		currentGfgStep = $(this).parent();
		previousGfgStep = $(this).parent().prev();

		$("#progressbar li").eq($("fieldset")
			.index(currentGfgStep)).removeClass("active");

		previousGfgStep.show();

		currentGfgStep.animate({ opacity: 0 }, {
			step: function (now) {
				opacity = 1 - now;

				currentGfgStep.css({
					'display': 'none',
					'position': 'relative'
				});
				previousGfgStep.css({ 'opacity': opacity });
			},
			duration: 500
		});
		setProgressBar(--current);
	});

	function setProgressBar(currentStep) {
		var percent = parseFloat(100 / steps) * current;
		percent = percent.toFixed();
		$(".progress-bar")
			.css("width", percent + "%")
	}

	$(".submit").click(function () {
		return false;
	})
});


// dataset 属性选择器
const log = console.log;
const btns = document.querySelectorAll("[data-edit]");
btns.forEach(btn =>
    btn.addEventListener("click", function (e) {
        // ES6 arrow function , this bug ❌
        e.preventDefault();
        // log(this.getAttribute("data-edit"));
        const cmd_val = this.getAttribute("data-edit").split(":");
        log(`cmd_val =`, cmd_val);
        if(cmd_val[0] === 'copy') {
            document.execCommand(cmd_val[0]);
            alert(`\`${cmd_val[0]}\`, 复制成功!`)
        } else {
            log(`cmd_val[0] =`, cmd_val[0]);
            log(`cmd_val[1] =`, cmd_val[1]);
            document.execCommand(cmd_val[0], false, cmd_val[1]);
        }
    })
);


/*

https://www.cnblogs.com/xgqfrms/p/13901860.html


*/