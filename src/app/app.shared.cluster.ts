import { throwError } from 'rxjs';
import { Injectable } from "@angular/core";

@Injectable()
export class AppCluster {
  validEmail(email) {
    var regexp = new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    return regexp.test(email);
  }

  validDigits(number) {
    var regexp = new RegExp(/[0-9]/g);
    return regexp.test(number);
  }

  validMobile(number) {
    var regexp = new RegExp(/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g);
    return regexp.test(number);
  }

  disableScrolling() {
    document.querySelector('html').style.overflowY = 'hidden';
    document.body.style.overflowY = 'hidden';
  }

  enableScrolling() {
    document.querySelector('html').style.overflowY = 'auto';
    document.body.style.overflowY = 'auto';
  }

  errorHandle(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  loadJsFile(url) {
    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(node);
  }

  monitor(callback, wait) {
    return setInterval(() => {
      callback();
    }, wait);
  }

  arrayOf(n: number): number[] {
    return [...Array(n).keys()];
  }
  getMinDate() {
    let today = new Date().toISOString().substring(0, 10);
    return today;
  }

  decodeDuration(duration: number, type: string) {
    var factor = [1, 7, 30, 360];
    switch (type) {
      case 'D':
        return factor[0] * duration;
      case 'W':
        return factor[1] * duration;
      case 'M':
        return factor[2] * duration;
      case 'Y':
        return factor[3] * duration;
      default:
        return duration;
    }
  }
  decodeStatus(status) {
    switch (status) {
      case 'AC':
        return 'Available';
      case 'PV':
        return 'Pending Review';
      case 'NA':
        return 'Not Available';
      case 'IA':
        return 'Closed';
      case 'RE':
        return 'Rejected';
      case 'PA':
        return 'Pending Approval';
      case 'PC':
        return 'Payment Confirmed';
      case 'AP':
        return 'Approved';
      case 'OS':
        return 'Out of Stock';
      default:
        return status;
    }
  }
  toTimeAgo(date) {
    var d = Date.parse(date);
    var seconds = Math.floor((new Date().getTime() - d) / 1000);
    var interval = seconds / 31536000;
    if (interval > 1) {
      return Math.floor(interval) > 1
        ? Math.floor(interval) + ' Years Ago'
        : Math.floor(interval) + ' Year Ago';
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) > 1
        ? Math.floor(interval) + ' Months Ago'
        : Math.floor(interval) + ' Month Ago';
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) > 1
        ? Math.floor(interval) + ' Days Ago'
        : Math.floor(interval) + ' Day Ago';
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return 'Today';
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) > 1
        ? Math.floor(interval) + ' Minutes Ago'
        : Math.floor(interval) + ' Minute Ago';
    }
    return Math.floor(interval) > 1
      ? Math.floor(interval) + ' Seconds Ago'
      : Math.floor(interval) + ' Second Ago';
  }

  getUniqueId(parts: number): string {
    const stringArr = [];
    for (let i = 0; i < parts; i++) {
      const S4 = (((1 + Math.random()) * 0x10000) | 0)
        .toString(16)
        .substring(1);
      stringArr.push(S4);
    }
    return stringArr.join('');
  }
  toMoney(number) {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2,
    });
    var result = formatter.format(number);
    result = result.substring(0, result.indexOf('.'));
    return result;
  }
  toNumber(money) {
    money.replace(',', '');
    return money;
  }
  getURLParameter(url) {
    return url.substring(url.lastIndexOf('/') + 1, url.length);
  }
  getFutureYears() {
    let year = new Date().getFullYear();
    let years = [];
    for (let i = year; i < 2099; i++) years.push(i);
    return years;
  }

  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  getJSON(formData: FormData) {
    let output = {};
    formData.forEach((value, key) => {
      if (Object.prototype.hasOwnProperty.call(output, key)) {
        let current = output[key];
        if (!Array.isArray(current)) {
          current = output[key] = [current];
        }
        current.push(value);
      } else {
        output[key] = value;
      }
    });
    return JSON.stringify(output);
  }
}
