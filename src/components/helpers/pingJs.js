const checked = 0;
const sort_servers = [];
const send_servers = [];
function http_ping(hostname, server_id, name, location, total, choose) {
  const NB_ITERATIONS = 3; // number of loop iterations
  const MAX_ITERATIONS = 4; // beware: the number of simultaneous XMLHttpRequest is limited by the browser!
  const TIME_PERIOD = 1000; // 1000 ms between each ping
  let i = 0;
  let over_flag = 0;
  let time_cumul = 0;
  const REQUEST_TIMEOUT = 5000;
  let TIMEOUT_ERROR = 0;
  let FAIL_ERROR = 0;
  choose = typeof choose !== 'undefined' ? choose : false;
  total = typeof total !== 'undefined' ? total : 0;
  name = typeof name !== 'undefined' ? name : undefined;
  server_id = typeof server_id !== 'undefined' ? server_id : 0;
  location = typeof location !== 'undefined' ? location : undefined;

  console.log(`HTTP ping for ${hostname}`);


  const ping_loop = setInterval(() => {
    // let's change non-existent URL each time to avoid possible side effect with web proxy-cache software on the line
    // url = "http://" + hostname + "/ping/" + Math.random().toString(36).substring(7);
    const set_port = ':100';
    // if (choose === true) {set_port = ':444'}
    const url = `//${hostname}${set_port}/ping/?${Math.random().toString(36).substring(7)}`;

    if (i < MAX_ITERATIONS) {
      let delta_time;
      const ping = new XMLHttpRequest();

      i++;
      ping.seq = i;
      over_flag++;

      ping.date1 = Date.now();

      ping.timeout = REQUEST_TIMEOUT; // it could happen that the request takes a very long time

      ping.onreadystatechange = function () { // the request has returned something, let's log it (starting after the first one)
        if (ping.readyState === 4 && TIMEOUT_ERROR === 0) {
          over_flag--;

          if (ping.seq > 1) {
            delta_time = Date.now() - ping.date1;
            time_cumul += delta_time;
          console.log(delta_time)
            // var percent = Math.floor(((ping.seq-1)/NB_ITERATIONS)*100)  + '%';
            // var $this   = $('.progress-bar-servers');
            // $this.css('width', percent);
            // if ( ! $this.parent().hasClass('progress-mini')) {
            //    $this.html(percent);
            // }

            // console.log("http_seq=" + (ping.seq-1) + " time=" + delta_time + " ms");
          }
        }
      };


      ping.ontimeout = function () {
        TIMEOUT_ERROR = 1;
      };

      ping.onerror = function () {
        FAIL_ERROR = 1;
      };

      ping.open('GET', url, true);
      ping.setRequestHeader('Content-type', 'text/html');
      ping.send();
    }
  });
}
//     let send_server;
//     let avg_time;
//     let status;
//     if (choose === false) {
//       if ((i > NB_ITERATIONS) && (over_flag < 1)) { // all requests are passed and have returned
//         clearInterval(ping_loop);
//         avg_time = Math.round(time_cumul / (i - 1));
//         if (avg_time < 100) { status = 'success'; } else { status = 'info'; }
//         console.log(`Average ping (${hostname}) latency on ${i - 1} iterations: ${avg_time}ms`);
//         // $(`*[data-ping="${hostname}"]`).html(`<span class=\"badge badge-${status}\">${avg_time} ms</span>`);
//         send_server = [{ server_id, ping: avg_time }];
//         // $.ajax({
//         //   url: '/api/ping/',
//         //   contentType: 'application/json; charset=utf-8',
//         //   dataType: 'json',
//         //   type: 'POST',
//         //   data: JSON.stringify(send_server),
//         // });
//         return true;
//       }
//
//       if (TIMEOUT_ERROR === 1 || FAIL_ERROR === 1) { // timeout: data cannot be accurate
//         clearInterval(ping_loop);
//         console.log('THERE WAS A TIMEOUT ERROR');
//         // $(`*[data-ping="${hostname}"]`).html('<span class="badge badge-danger">timeout</span>');
//         send_server = [{ server_id, ping: 0 }];
//         // $.ajax({
//         //   url: '/api/ping/',
//         //   contentType: 'application/json; charset=utf-8',
//         //   dataType: 'json',
//         //   type: 'POST',
//         //   data: JSON.stringify(send_server),
//         // });
//         return true;
//       }
//     } else {
//       if ((i > NB_ITERATIONS) && (over_flag < 1)) { // all requests are passed and have returned
//         clearInterval(ping_loop);
//         avg_time = Math.round(time_cumul / (i - 1));
//         result_servers(hostname, server_id, name, location, avg_time);
//         return true;
//       }
//
//       if (TIMEOUT_ERROR === 1 || FAIL_ERROR === 1) { // timeout: data cannot be accurate
//         clearInterval(ping_loop);
//         console.log(`Average ping (${hostname}) latency THERE WAS A TIMEOUT ERROR`);
//         result_servers(hostname, server_id, name, location, 0);
//         return true;
//       }
//     }
//   }, TIME_PERIOD);
//
//   function result_servers(hostname, server_id, name, location, ping_ms) {
//     if (ping_ms !== 0) {
//       sort_servers.push({
//         server_id,
//         location,
//         server: hostname,
//         ping: ping_ms,
//         name,
//       });
//     }
//     send_servers.push({
//       server_id,
//       location,
//       server: hostname,
//       ping: ping_ms,
//       name,
//     });
//     checked += 1;
//
//     if (checked === total) {
//       sort_servers.sort((a, b) => parseFloat(a.ping) - parseFloat(b.ping));
//       const servers = sort_servers.slice(0, 3);
//       const serversLength = servers.length;
//       for (let i = 0; i < serversLength; i++) {
//         // Servers.setup(i + 1, parseInt(servers[i].server_id), servers[i].name, servers[i].ping);
//       }
//
//       // Servers.length(serversLength);
//
//       // $.ajax({
//       //   url: '/api/ping/',
//       //   contentType: 'application/json; charset=utf-8',
//       //   dataType: 'json',
//       //   type: 'POST',
//       //   data: JSON.stringify(send_servers),
//       // });
//     }
//   }
// }
//
// function ping_servers() {
//   checked = 0;
//   sort_servers = [];
//   send_servers = [];
//   const servers = [];
//   const inputs = document.getElementsByClassName('servers-ping');
//   [].map.call(inputs, (input) => {
//     servers.push({
//       // server: input.value,
//       // name: input.getAttribute('data-name'),
//       // location: input.getAttribute('data-location'),
//       // server_id: input.getAttribute('data-server-id'),
//     });
//   });
//
//   const serversLength = servers.length;
//   for (let i = 0; i < serversLength; i++) {
//     http_ping(
//       servers[i].server,
//       servers[i].server_id,
//       servers[i].name,
//       servers[i].location,
//       serversLength,
//       true,
//     );
//   }
// }

export default http_ping;
