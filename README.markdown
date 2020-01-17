# Kurosaki HTML5 Audio Player with Retina Display Support

Kurosaki HTML5 Audio Player is written in Pure JavaScript. No JavaScript library needed. It uses HTML5 <audio> tag, and adds its own controls to every tag its used on. If HTML5 <audio> tag has controls attribute specified, Kurosaki HTML5 Audio Player removes this attribute, and adds its own controls.

To start using Kurosaki HTML5 Audio Player drop kurosakiHTML5AudioPlayer folder in your project. Reference CSS file in the head of your document:

```html
<link rel="stylesheet" href="kurosakiHTML5AudioPlayer/kurosakiHTML5AudioPlayer.css">
```

Reference JavaScript file in the head of your document:

```html
<script src="kurosakiHTML5AudioPlayer/kurosakiHTML5AudioPlayer.js"></script>
```

Initiate Kurosaki HTML5 Audio Player:

```html
<script>
kurosakiHTML5AudioPlayer();
</script>
```

Thats it! Now all <audio> tags on your page transformed into Kurosaki HTML5 Audio Player! Though, when you initiate Kurosaki HTML5 Audio Player without any options, it uses default options. Default options are:

```html
<script>
kurosakiHTML5AudioPlayer({
    selector: 'audio',
    width: '100%',
    maxWidth: '100%',
    minWidth: '0',
    theme: 'light',
    seekBar: true,
    volumeControl: true
});
</script>
```

To see available options [view demo](http://githubprofile.github.io/kurosaki-html5-audio-player/).

## License

All code is distributed under BSD 3-Clause license. See [./licensing/LICENSE-BSD-3-CLAUSE](./licensing/LICENSE-BSD-3-CLAUSE) for full text of license.

All images are derivatives from [this freebie](http://elemisfreebies.com/02/09/audio-player-psd/) and governed by [theirs license](http://elemisfreebies.com/license-and-rules/).

Song used in demo is performance of Mozart's Violin Piano Sonata in E minor, K.304 - 2nd movement (tempo di menuetto) by violinist Carrie Rehkopf and is governed by [CC BY-SA](http://creativecommons.org/licenses/by-sa/3.0/) license.

Copyright (c) 2013 Denys Petiukov. All Rights Reserved.
