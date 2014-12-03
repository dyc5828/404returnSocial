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
	<script nsrc="js/facebook-sdk-async.js"></script>
	<script src="http://connect.facebook.net/en_US/sdk.js"></script>
	<!-- jquery and dependencies -->
	<script src="<?=JQ?>"></script>
	<script src="js/jquery.xml2json.js"></script>
	<script src="js/toastr.min.js"></script>
	<!-- required js -->
	<script src="js/config.js"></script>
	<script src="js/helper.js"></script>
	<script src="js/facebook-lib.js"></script>
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
	
<header ng-controller="HeaderCtrl">
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

<login>
	<div class="container" ng-controller="LoginCtrl">
		<!-- login -->

		<div id="social-connect">
			<div ng-class="{hidden: !fbLog}">
				<div class="login-title">
					Login with Facbook
				</div>
				<div class="login-fb">
					<fb:login-button
						scope="public_profile,email,read_stream"
						onlogin="checkLoginState();"
						data-size="large"
						ndata-max-rows="1"
						ndata-show-faces="true">
					</fb:login-button>
				</div>
			</div><!-- facebookEnable -->

			<div class="login-title">
				Connect More
			</div>

			<form role="form" ng-submit="connect()">
				<div class="social-input">
					<label for="twitterid">
						<img class="login-icon" src="asset/twitter.png"/>
						<!-- {{userids.twitterid}} -->
					</label>
					<input
						id="twitterid"
						ng-model="userids.twitterid"
						name= "twitter"
						type="text"
					/>
				</div><!-- social-input -->
				<div class="social-input">
					<label for="instagramid">
						<img class="login-icon" src="asset/instagram.png"/>
						<!-- {{userids.instagramid}} -->
					</label>
					<input
						id="instagramid"
						ng-model="userids.instagramid"
						name= "instagram"
						type="text"
					/>
				</div><!-- social-input -->
				<div class="social-input">
					<label for="pinterestid">
						<img class="login-icon" src="asset/pinterest.png"/>
						<!-- {{userids.pinterestid}} -->
					</label>
					<input
						id="pinterestid"
						ng-model="userids.pinterestid"
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
	<div class="container" ng-controller="FeedCtrl">
		<!-- main -->

		<div class="item" ng-repeat="item in items | orderBy:'date':true">

			<div class="item-text">

				<div class="item-top">

					<div class="item-icon">
						<img ng-click="test()" class="icon-img" ng-src="asset/{{item.type}}.png"/>
					</div><!-- item-icon -->
					<div class="item-title">{{item.title}}</div>
					<div class="item-date">{{item.date}}</div>

					<div class="clear"></div>
				</div><!-- item-top -->

				<div class="item-msg">
					{{item.message}}
				</div>
				<div class="item-aux">{{item.aux}}</div>

				<div class="clear"></div>
			</div><!-- item-text -->

			<div class="item-img" ng-if="item.image">
				<img class="img-img" ng-src="{{item.image}}"/>
			</div><!-- item-img-->

			<div class="clear"></div>
		</div><!-- item -->

	</div><!-- container -->
</main>

<footer>
	<div class="container">
		<!-- footer -->
	</div><!-- container -->
</footer>

</body>
</html>