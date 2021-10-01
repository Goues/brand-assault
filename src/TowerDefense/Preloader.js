import { sound } from '@pixi/sound'
import { SOUNDS } from '../config'

export default function preload(loader) {
	loader
		.add('add_tower', '/add_tower.png')
		.add('bullet', '/bullet.png')
		.add('busy_bee', '/busy_bee.png')
		.add('comment_negative', '/comment_negative.png')
		.add('comment_neutral', '/comment_neutral.png')
		.add('comment_positive', '/comment_positive.png')
		.add('connector', '/connector.png')
		.add('game_paused', '/game_paused.gif')
		.add('gameover', '/gameover.gif')
		.add('hater', '/hater.png')
		.add('hq', '/hq.png')
		.add('influencer', '/influencer.png')
		.add('optimist', '/optimist.jpeg')
		.add('path_corner_inside', '/path_corner_inside.png')
		.add('path_corner_outside', '/path_corner_outside.png')
		.add('path_line', '/path_line.png')
		.add('power_user', '/power_user.png')
		.add('purger', '/purger.jpg')
		.add('qtba', '/qtba.jpeg')
		.add('space_active_for_tower', '/space_active_for_tower.png')
		.add('space_for_tower', '/space_for_tower.png')
		.add('tower', '/tower.png')

	loader.load()

	sound.add(SOUNDS.GAMEOVER, 'sound/game_over.mp3')
	sound.add(SOUNDS.BACKGROUND_MUSIC, 'sound/background_retro_music.mp3')
	sound.add(SOUNDS.LASER, 'sound/laser.mp3')
	sound.add(SOUNDS.DAMAGE, 'sound/damage.mp3')
	sound.add(SOUNDS.COINS, 'sound/coins.mp3')
}
