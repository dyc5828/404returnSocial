<?php // main.php
include_once 'php/config.php'; // must have
?>
<!DOCTYPE html>
<html ng-app="social">
<head>
	<title>ITP404 Final</title>

	<!-- JS SRC -->
	<!-- ng framework -->
	<script src="js/angular.min.js"></script>
	<script src="js/angular-route.js"></script>
	<!-- facebook sdk -->
	<script src="http://connect.facebook.net/en_US/sdk.js"></script>
	<!-- jquery and dependencies -->
	<script src="<?=JQ?>"></script>
	<script src="js/jquery.xml2json.js"></script>
	<script src="js/toastr.min.js"></script>
	<!-- required js -->
	<script src="js/config.js"></script>
	<script src="js/helper.js"></script>
	<script src="js/facebook-api.js"></script>
	<!-- page js -->
	<script src="js/main.js"></script>

	<!-- FAVICON -->
	<link rel="icon" type="image/png" href="asset/feedStack.png"/>

    <!-- CSS LINK-->
	<link rel="stylesheet" href="css/toastr.min.css"/>
	<link rel="stylesheet" href="css/main.css"/>

	<script>

	jQuery(document).ready(function() {
		// DOM ready
	});

    </script>

</head>
<body>
<div id="fb-root"></div><!-- fb required -->

<ngtest class="hidden" ng-controller="TestCtrl">
	<form role="form" ng-submit="formSubmit()">
		<input ng-model="testInput" type="text"/>
		<input type="submit" value="submit"/>{{testInput}}
	</form>
	<div id="twitter-results"></div>
</ngtest><!-- angular test -->
	
<header>
	<div class="container" ng-controller="HeaderController">
		<!-- header -->

		<div id="user">
			<div id="userbtn">
				<fb:login-button
					scope="public_profile,email,read_stream"
					autologoutlink="true"
					onlogin="checkLoginState();">
				</fb:login-button>
			</div><!-- userbtn -->
			<a href="#/connect">
				<div id="username">{{username}}</div>
			</a>
			<div class="clear"></div>
		</div><!-- user -->

		<div id="control">
			<div id="app">return.social</div>
			<img class="header-icon" src="asset/facebook.png"/>
			<img class="header-icon" src="asset/twitter.png"/>
			<img class="header-icon" src="asset/instagram.png"/>
			<img class="header-icon" src="asset/pinterest.png"/>
			<div class="clear"></div>
		</div><!-- control -->


		<div class="clear"></div>
	</div><!-- container -->
</header>

<login>
	<div class="container" ng-controller="LoginController">
		<!-- login -->
		
		<div id="social-connect">
			<div nng-if="loggedIn" class="h/idden">
				<div class="login-title">
					Login with Facbook
				</div>
				<fb:login-button
					scope="public_profile,email,read_stream"
					autologoutlink="true"
					onlogin="checkLoginState();"
					data-size="large"
					ndata-max-rows="1"
					ndata-show-faces="true">
				</fb:login-button>
			</div><!-- facebookEnable -->

			<div class="login-title">
				Connect More
			</div>

			<form role="form" ng-submit="loginSubmit()">
				<div class="social-input hidden"><!-- hidden -->
					<label for="facebookid">
						<img class="login-icon" src="asset/facebook.png"/>
						<!-- {{facebookid}} -->
					</label>
					<input
						id="facebookid"
						ng-model="facebookid"
						name= "facebook"
						type="text"
					/>
				</div><!-- social-input -->
				<div class="social-input">
					<label for="twitterid">
						<img class="login-icon" src="asset/twitter.png"/>
						<!-- {{twitterid}} -->
					</label>
					<input
						id="twitterid"
						ng-model="twitterid"
						name= "twitter"
						type="text"
					/>
				</div><!-- social-input -->
				<div class="social-input">
					<label for="instagramid">
						<img class="login-icon" src="asset/instagram.png"/>
						<!-- {{instagramid}} -->
					</label>
					<input
						id="instagramid"
						ng-model="instagramid"
						name= "instagram"
						type="text"
					/>
				</div><!-- social-input -->
				<div class="social-input">
					<label for="pinterestid">
						<img class="login-icon" src="asset/pinterest.png"/>
						{{pinterestid}}
					</label>
					<input
						id="pinterestid"
						ng-model="pinterestid"
						name= "pinterest"
						type="text"
					/>
				</div><!-- social-input -->

				<!-- <div ng-if="!twitterid">twitter test</div> -->

				<div class="clear"></div>
				<input type="submit" value="Connect"/>

				<div class="clear"></div>
			</form>

			<div class="clear"></div>
		</div><!-- social-id -->

		<div class="clear"></div>
	</div><!-- container -->
</login>

<main>
	<div class="container">
		main
		<div class="item">
			<div class="item-icon">
				<img class="icon-img" src="asset/facebook.png"/>
			</div><!-- item-icon -->
			<div class="item-title">Title</div>
			<div class="item-date">Date</div>
			<div class="item-desc">Desc</div>
			<div class="item-img">
				<img class="img-img" src="car.jpg"/>
			</div><!-- item-img-->
		</div><!-- item -->

	</div><!-- container -->
</main>

<footer>
	<div class="container">
		footer



	</div><!-- container -->
</footer>

</body>
</html>