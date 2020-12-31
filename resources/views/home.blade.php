<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="csrf-token" content="{{ csrf_token() }}">

	<title>Home</title>
	<link href="{{ asset('assets/css/general.css') }}" rel="stylesheet">
	<link href="{{ asset('assets/css/home.css') }}" rel="stylesheet">
	<link href="{{ asset('assets/fontawesome/css/all.css') }}" rel="stylesheet">
</head>

<body>
	<div id="root" class="root">
		<div class="navi">
			<div class="logo">
				<i class="fas fa-jedi"></i>
				<span>Nhóm 12</span>
			</div>
		</div>
		<div class="main-content">
			<div class="sidebar">
				<div class="user-section">
					<div class="card-block text-center text-white " style="display: flex;flex-direction: column;align-items:center;position: relative;">
						<img src="uploads/{{ Auth::user()->avatar }}" class="img-radius" alt="Choose a picture">
						<h3>{{ Auth::user()->name }}</h3>
						<div id="camera" class="camera">
							<i class="fas fa-camera"></i>
						</div>
					</div>
					<div style="width: 100%;height: 2px; background-color: dimgray;margin: 20px 0;">
					</div>
					<div id="board-picked" class="btn is-clicked">
						<i class="fab fa-trello"></i>
						<span>Boards</span>
					</div>
					<div id="information-picked" class="btn">
						<i class="fas fa-user"></i>
						<span>Profile</span>
					</div>
					<div class="btn">
						<i class="fas fa-door-open"></i>
						<a id="logout" href="{{ route('logout') }}" style="text-decoration: none;" onclick="event.preventDefault();
										document.getElementById('logout-form').submit();">
							Logout
						</a>
						<form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
							{{ csrf_field() }}
						</form>
					</div>
				</div>
			</div>
			<div class="container">
				<div id="board-section" class="board-section">
					<div class="board-title">
						<span><i class="fas fa-user"></i></span>
						<span>Personal boards</span>
					</div>

					<div id="board-wrapper" class="board-wrapper">
						<div id="new-board" class="board new-board">
							<i class="fas fa-plus"></i>
							<span>Create new board</span>
						</div>
					</div>

				</div>

				<div id="information-section" class="information hide">
					<div class="information-title">
						<span><i class="fas fa-user"></i></span>
						<span>Information</span>
					</div>
					<div class="information">
						<div class="infor">
							<div style="margin-right: 20px;">User's name :</div>
							<div>{{ Auth::user()->name }}</div>
						</div>

						<div class="infor">
							<div style="margin-right: 20px;">Email : </div>
							<div>{{ Auth::user()->email }}</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div id="popup" class="popup hide">
			<div class="new-board-box">
				<input type="text" name="" id="input-name-board" placeholder="Add board title" autocomplete="off" spellcheck="false">
				<div class="popup-control">
					<button id="save-board" class="change-btn" type="button">Save</button>
					<button id="cancel-board" class="unchange-btn" type="button"><i class="fas fa-times"></i></button>
				</div>
			</div>
		</div>

		<div id="popup-action" class="popup-action hide" data-id-board="">
			<div class="popup-title">
				<span>List actions</span>
			</div>
			<div class="popup-horizontal">
			</div>
			<div id="change-title-btn" class="popup-btn">Change title</div>
			<div id="delete-board-btn" class="popup-btn delete"><span>Delete board</span></div>
		</div>

		<div id="avatar-picker" class="avatar-picker hide">
			<div class="popup-title">
				<span>Pick a color</span>
			</div>
			<div class="popup-horizontal">
			</div>
			<div class="color-palette">
			</div>
		</div>

		<!-- Popup hiển thị thông diệp trả về -->
		<div id="popup-message" class="popup popup-message hide">
			<span></span>
		</div>

		<form id="form-upload" class="" action="/profile" method="POST" enctype="multipart/form-data">
			<input type="file" name="avatar" id="upload-photo" style="position: absolute;" />
		</form>
	</div>

	<script src="{{ asset('assets/js/jquery-3.5.1.js') }}"></script>
	<script src="{{ asset('assets/js/ultilities.js') }}"></script>
	<script src="{{ asset('assets/js/home.js') }}"></script>
	<script type="text/javascript">
		handleAPI("/boards/", {}, "GET", "board");
		createColorPalatte();
	</script>
</body>

</html>