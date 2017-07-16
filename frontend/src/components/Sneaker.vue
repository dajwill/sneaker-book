<template lang="html">
  <div id="sneaker">
    <section class="hero is-primary">
      <h1 class="title">Ultraboost</h1>
    </section>

    <div class="columns">
      <div class="column is-one-third">
        <div class="card">
          <div class="card-image">
            <figure class="image is-4by3">
              <img src="http://bulma.io/images/placeholders/1280x960.png" alt="Image">
            </figure>
          </div>
          <div class="card-content">
            <div class="media">
              <div class="media-content">
                <p class="title is-4">Haven UltraBoost</p>
                <p class="subtitle is-6">adidas</p>
              </div>
            </div>
          </div>
        </div>

        <ul class="menu-list">
          <li><a>Dashboard</a></li>
          <li><a>Customers</a></li>
        </ul>
      </div>

      <div class="column" id="notes">
        <div id="timeline">
          <article class="media">
            <figure class="media-left">
              <p class="image is-64x64">
                <img src="http://bulma.io/images/placeholders/128x128.png">
              </p>
            </figure>
            <div class="media-content">
              <div class="content">
                <p>
                  <strong>John Smith</strong> <small>@johnsmith</small> <small>31m</small>
                  <br>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
                </p>
              </div>
              <nav class="level is-mobile">
                <div class="level-left">
                  <a class="level-item">
                    <span class="icon is-small"><i class="fa fa-reply"></i></span>
                  </a>
                  <a class="level-item">
                    <span class="icon is-small"><i class="fa fa-retweet"></i></span>
                  </a>
                  <a class="level-item">
                    <span class="icon is-small"><i class="fa fa-heart"></i></span>
                  </a>
                </div>
              </nav>
            </div>
            <div class="media-right">
              <button class="delete"></button>
            </div>
          </article>
        </div>

        <div class="field" id="message-input">
          <label class="label">Message</label>
          <p class="control">
            <textarea class="textarea" placeholder="Textarea"></textarea>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    console.log(this.props);
  }
}
</script>

<style lang="css">
  #notes {
    height: 90vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  /*#notes > div, #notes > article { flex: 0 0 100%; }*/
  #timeline {
    width: 100%;
  }
  #message-input {
    align-self: flex-end;
    width: 100%;
  }
</style>
