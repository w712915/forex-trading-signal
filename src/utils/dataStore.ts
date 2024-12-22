interface StoredForexData {
  timestamp: string;
  rate: number;
}

class ForexDataStore {
  private static MAX_ITEMS = 100; // 保存する最大データ数
  private static data: StoredForexData[] = [];

  static addData(newData: StoredForexData) {
    this.data.push(newData);
    if (this.data.length > this.MAX_ITEMS) {
      this.data.shift(); // 古いデータを削除
    }
  }

  static getData(): StoredForexData[] {
    return this.data;
  }

  static getRates(): number[] {
    return this.data.map((item) => item.rate);
  }
}

export default ForexDataStore;
