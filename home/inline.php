<?php

function getNewsletter(){
	?>
	<h3>Register</h3>
	<p>Two steps and you're done</p>				
	<form id="theForm" class="simform" autocomplete="off">
		<div class="simform-inner">
			<ol class="questions">
				<li>
					<span><label for="q1">What's your email address?</label></span>
					<input id="q1" name="q1" type="text"/>
				</li>
				<li>
					<span><label for="q2">Add a password</label></span>
					<input id="q2" name="q2" type="text"/>
				</li>
			</ol><!-- /questions -->
			<button class="submit" type="submit">Send answers</button>
			<div class="controls">
				<button class="next"></button>
				<div class="progress"></div>
				<span class="number">
					<span class="number-current"></span>
					<span class="number-total"></span>
				</span>
				<span class="error-message"></span>
			</div><!-- / controls -->
		</div><!-- /simform-inner -->
		<span class="final-message"></span>
	</form><!-- /simform -->
	<?php
}

?>