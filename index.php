<?php // main.php
include_once 'php/config.php'; // must have
?>
<!DOCTYPE html>
<html ng-app="social">
<head>
	<title>ITP404 Final</title>

	<!-- META -->
	<meta charset="utf-8">

	<!-- JS SRC -->
	<!-- ng framework -->
	<script src="js/angular.min.js"></script>
	<script src="js/angular-route.js"></script>
	<!-- facebook sdk -->
	<script src="http://connect.facebook.net/en_US/all.js"></script>
	<!-- jquery and dependencies -->
	<script src="<?=JQ?>"></script>
	<script src="js/jquery.xml2json.js"></script>
	<!-- required js -->
	<script src="js/config.js"></script>
	<script src="js/helper.js"></script>
	<script src="js/facebook-lib.js"></script>
	<!-- ng app js -->
	<script src="js/app.js"></script>
	<script src="js/userSvc.js"></script>
	<script src="js/buildSvc.js"></script>
	<script src="js/facebookSvc.js"></script>
	<script src="js/twitterSvc.js"></script>
	<script src="js/instagramSvc.js"></script>
	<script src="js/pinterestSvc.js"></script>

	<!-- FAVICON -->
	<link rel="icon" type="image/png" href="asset/feedStack.png"/>

    <!-- CSS LINK-->
	<link rel="stylesheet" href="css/main.css"/>

	<!-- PAGE CSS -->
	<style></style>

	<!-- PAGE JS -->
	<script>

	jQuery(document).ready(function() {
		// DOM ready
	});

    </script>

</head>
<body ng-controller="BkgdCtrl"><!-- Background Ctrl -->
<div id="fb-root"></div><!-- fb required -->

<ngtest class="hidden" ng-controller="TestCtrl">
	<form role="form" ng-submit="formSubmit()">
		<input ng-model="testInput" type="text"/>
		<input type="submit" value="submit"/>{{testInput}}
	</form>
	<div id="twitter-results"></div>
</ngtest><!-- angular test -->

<!-- CTRL -->
<div id="wrap">

<header>
	<div class="container">
		<!-- header -->

		<div id="user">
			<div id="userbtn">
				<fb:login-button
					scope="public_profile,email,read_stream"
					autologoutlink="true"
					onlogin="checkLoginState();">
				</fb:login-button>
			</div><!-- userbtn -->
			<a ng-href="#/connect">
				<div id="username">{{username}}</div>
			</a>
			<div class="clear"></div>
		</div><!-- user -->

		<div id="control">
			<div id="app"><a ng-href="#/feed">return.social</a></div>
			<img class="header-icon" src="asset/facebook.png"/>
			<img class="header-icon" src="asset/twitter.png"/>
			<img class="header-icon" src="asset/instagram.png"/>
			<img class="header-icon" src="asset/pinterest.png"/>
			<div class="clear"></div>
		</div><!-- control -->


		<div class="clear"></div>
	</div><!-- container -->
</header>

<main ng-view>
</main>

<footer>
	<div class="container">
		<!-- footer -->
	</div><!-- container -->
</footer>

</div><!-- wrap -->
<!-- END CTRL -->
</body>
</html>