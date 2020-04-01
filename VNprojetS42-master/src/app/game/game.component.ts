import { Component, OnInit } from '@angular/core';

import Phaser from 'phaser';
import PlatformerScene from './PlatformerScene';
import Level2 from './Level2';
import { MenuScene } from './MenuScene';
import CreditScene from './CreditScene';
import Level3 from './Level3';
import VN01 from './VN01';
import VN02 from './VN02';
import VN03 from './VN03';
import VN04 from './VN04';
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  phaserGame: Phaser.Game;
  config: Phaser.Types.Core.GameConfig;
  constructor() {
    this.config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
        parent: "gameContainer",
        scene: [MenuScene, PlatformerScene, Level2, Level3, CreditScene, VN01, VN02, VN03, VN04],
      physics: {
          default: "arcade",
          arcade: {
              debug: false,
          gravity: { y : 1000}
        }
      }
    };
  }

  ngOnInit() {
    this.phaserGame = new Phaser.Game(this.config);
  }
}
