# Case-Study-Creat-game-Doctor-Mario

Game		Option
Width = int		
Height = int		
color		
x = position horizontal		
y = vertical		
Block or Pill	"Block rơi xuống từ - Height x, y cố định
Block chỉ rơi xuống innerHeight hoặc virus là dừng lại"	
virus	xuất hiện mặc định từ phía dưới, maxHeight	
nextBlock	Block tiếp theo rơi xuống từ vị trí x, y cố định, màu sắc random	
		
moveLeft	di chuyển Block sang trái	Keycode 37
moveRight	di chuyển Block sang phải	Keycode 39
moveDown	di chuyển Block xuống dưới nhanh hơn	Keycode 40
moveFastDown	nhấn giữ phím down Block sẽ rơi nhanh hơn	
rotatoBlock	xoay block nhưng mắc cạnh virus sẽ không xoay được	Keycode 38
collisionVirus	"khi Block chạm vào virus, Block sẽ nằm trên virus,
khi đủ 3 block cùng màu nhau + virus 
sẽ biến mất cả block và virus đó"	
decreaseBlock	khi virus cùng màu với 3 Block, virus và block biến mất	
checkWin	Khi không còn virus trên màn hình	
gameOver	Khi Block = top or < innerHeight	
pauseGame	Speed Block = 0 và thông báo PauseGame	button P
startGame	Thông báo New Game	button Enter
getScore	"khi virus cùng màu với 3 Block, virus và block biến mất
sẽ được cộng 10 points"	
