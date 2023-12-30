class LocalStorage {
  constructor() {
    this.moviesWatched =
      this.load('watched-list') === undefined ? [] : this.load('watched-list');
    this.moviesQueue =
      this.load('queue-list') === undefined ? [] : this.load('queue-list');
  }

  saveToWatched(key, value) {
    try {
      this.moviesWatched.unshift(value);

      const serializedData = JSON.stringify(this.moviesWatched);
      localStorage.setItem(key, serializedData);
    } catch (err) {
      console.error(err);
    }
  }

  saveToQueue(key, value) {
    try {
      this.moviesQueue.unshift(value);

      const serializedData = JSON.stringify(this.moviesQueue);
      localStorage.setItem(key, serializedData);
    } catch (err) {
      console.error(err);
    }
  }

  load(key) {
    try {
      const serializedData = localStorage.getItem(key);
      return serializedData === null ? undefined : JSON.parse(serializedData);
    } catch (error) {
      console.error(error);
    }
  }

  remove(key) {
    localStorage.removeItem(key);
  }
}

export default LocalStorage;
