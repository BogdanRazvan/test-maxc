import { defineComponent as qt, getCurrentInstance as xt, ref as T, reactive as z, computed as g, watch as f, onBeforeMount as Lt, onBeforeUnmount as Mt, nextTick as J, h as o, withDirectives as Be } from "vue";
import { C as X, R as Ft, u as Et, Q as h, a as B, b as Se, c as Qt, d as Y, e as At, f as Re, g as qe, h as xe, i as D } from "./index-83b9568d.js";
import "vuedraggable";
import "moment";
import "vue3-apexcharts";
/*!
 * @quasar/quasar-ui-qmediaplayer v2.0.0-beta.6
 * (c) 2022 Jeff Galbraith <jeff@quasar.dev>
 * Released under the MIT License.
 */
const Nt = "M0 0h24v24H0z@@fill:none;&&M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z";
function Z(a, u) {
  return a !== void 0 ? a() : u;
}
const Le = (a) => (a = Math.floor(a), a < 10 ? "0" + a : a + ""), U = (a) => {
  let u = 0;
  return u = Math.floor(a / 60), a = a - u * 60, Le(u) + ":" + Le(a);
};
var ee = qt({
  name: "QMediaPlayer",
  directives: {
    ClosePopup: X,
    Ripple: Ft
  },
  props: {
    type: {
      type: String,
      required: !1,
      default: "video",
      validator: (a) => ["video", "audio"].includes(a)
    },
    mobileMode: Boolean,
    source: String,
    sources: {
      type: Array,
      default: () => []
    },
    poster: {
      type: String,
      default: ""
    },
    tracks: {
      type: Array,
      default: () => []
    },
    dense: Boolean,
    autoplay: Boolean,
    crossOrigin: {
      type: [String],
      default: null,
      validator: (a) => a === null || ["anonymous", "use-credentials"].includes(a)
    },
    volume: {
      type: Number,
      default: 60,
      validator: (a) => a >= 0 && a <= 100
    },
    hideVolumeSlider: Boolean,
    hideVolumeBtn: Boolean,
    hidePlayBtn: Boolean,
    hideSettingsBtn: Boolean,
    hideFullscreenBtn: Boolean,
    disabledSeek: Boolean,
    preload: {
      type: String,
      default: "metadata",
      validator: (a) => ["none", "metadata", "auto"].includes(a)
    },
    noVideo: Boolean,
    muted: Boolean,
    playsinline: Boolean,
    loop: Boolean,
    trackLanguage: {
      type: String,
      default: "off"
      // value for 'Off'
    },
    showTooltips: Boolean,
    showBigPlayButton: {
      type: Boolean,
      default: !0
    },
    showSpinner: {
      type: Boolean,
      default: !0
    },
    spinnerSize: String,
    noControls: Boolean,
    nativeControls: Boolean,
    bottomControls: {
      type: Boolean,
      default: !1
    },
    controlsDisplayTime: {
      type: Number,
      default: 4e3
    },
    playbackRates: Array,
    // initial playback rate
    playbackRate: {
      type: Number,
      default: 1
    },
    dark: Boolean,
    radius: {
      type: [Number, String],
      default: 0
    },
    contentStyle: [String, Object],
    contentClass: [String, Object],
    contentWidth: Number,
    contentHeight: Number
  },
  emits: [
    "mediaPlayer",
    "playbackRate",
    "trackLanguage",
    "showControls",
    "volume",
    "muted",
    "fullscreen",
    "networkState",
    "abort",
    "ready",
    "canplaythrough",
    "duration",
    "emptied",
    "ended",
    "error",
    "loadeddata",
    "loadedmetadata",
    "stalled",
    "suspend",
    "loadstart",
    "paused",
    "play",
    "playing",
    "timeupdate",
    "waiting"
  ],
  setup(a, { slots: u, emit: s, expose: Me }) {
    const te = xt(), m = Et() || te.proxy.$q || te.ctx.$q, S = T(!1), d = z({
      mediaPlayer: {}
    }), v = z({
      mediaPlayer: {}
    }), l = T(null), p = T(null), ae = T(null), _ = z({
      // timer used to hide control during mouse inactivity
      hideControlsTimer: null
    }), t = z({
      errorText: null,
      controls: !1,
      showControls: !0,
      inControls: !1,
      volume: 60,
      muted: !1,
      currentTime: 0.01,
      duration: 1,
      durationTime: "00:00",
      remainingTime: "00:00",
      displayTime: "00:00",
      inFullscreen: !1,
      loading: !0,
      playReady: !1,
      playing: !1,
      playbackRates: [
        { label: ".5x", value: 0.5 },
        { label: "Normal", value: 1 },
        { label: "1.5x", value: 1.5 },
        { label: "2x", value: 2 }
      ],
      playbackRate: 1,
      trackLanguage: "Off",
      showBigPlayButton: !0,
      metadataLoaded: !1,
      spinnerSize: "5em",
      bottomControls: !1
    }), H = T(!1), ne = [
      "abort",
      "canplay",
      "canplaythrough",
      "durationchange",
      "emptied",
      "ended",
      "error",
      "interruptbegin",
      "interruptend",
      "loadeddata",
      "loadedmetadata",
      "loadedstart",
      "pause",
      "play",
      "playing",
      "progress",
      "ratechange",
      "seeked",
      "timeupdate",
      "volumechange",
      "waiting"
    ], Fe = g(() => ({
      "q-media__fullscreen": t.inFullscreen,
      "q-media__fullscreen--window": t.inFullscreen
    })), Ee = g(() => ({
      "q-media--player": !0,
      "q-media--player--bottom-controls--standard": !a.dense && t.bottomControls && t.inFullscreen,
      "q-media--player--bottom-controls--dense": a.dense && t.bottomControls && t.inFullscreen
    })), le = g(() => ({
      "q-media__controls--dense": !u.controls && (t.showControls || a.mobileMode) && a.dense,
      "q-media__controls--standard": !u.controls && (t.showControls || a.mobileMode) && !a.dense,
      "q-media__controls--hidden": !t.showControls,
      "q-media__controls--bottom-controls": t.bottomControls
    })), Qe = g(() => ({
      "q-media__controls--dense": a.dense,
      "q-media__controls--standard": !a.dense,
      "q-media__controls--bottom-controls": t.bottomControls
    })), Ae = g(() => {
      const e = {};
      return t.inFullscreen !== !0 && (Object.assign(e, j("style", a.contentStyle)), a.bottomControls === !0 && e.height === void 0 && (e.height = `calc(100% - ${Ve.value}px)`), e.height === void 0 && (e.height = "100%")), e;
    }), Ne = g(() => t.volume > 1 && t.volume < 70 && !t.muted ? v.mediaPlayer.volumeDown : t.volume >= 70 && !t.muted ? v.mediaPlayer.volumeUp : v.mediaPlayer.volumeOff), oe = g(() => {
      const e = [], n = {};
      n.label = d.mediaPlayer.trackLanguageOff, n.value = "off", e.push(n);
      for (let r = 0; r < a.tracks.length; ++r) {
        const c = {};
        c.label = c.value = a.tracks[r].label, e.push(c);
      }
      return e;
    }), i = g(() => l.value && l.value.volume !== void 0), R = g(() => a.type === "audio"), y = g(() => a.type === "video"), Oe = g(() => {
      let e = "";
      return t.playbackRates.forEach((n) => {
        n.value === t.playbackRate && (e = n.label);
      }), e;
    }), Ve = g(() => p.value ? p.value.clientHeight : a.dense ? 40 : 80);
    f(() => l.value, () => {
      Ye(), s("mediaPlayer", l.value);
    }), f(() => a.poster, () => {
      mt();
    }), f(
      () => a.sources,
      () => {
        K();
      },
      { deep: !0 }
    ), f(() => a.source, () => {
      K();
    }), f(
      () => a.tracks,
      () => {
        G();
      },
      { deep: !0 }
    ), f(() => a.volume, () => {
      he();
    }), f(() => a.muted, () => {
      be();
    }), f(() => a.trackLanguage, () => {
      P();
    }), f(() => a.showBigPlayButton, () => {
      _e();
    }), f(() => a.playbackRates, () => {
      $();
    }), f(() => a.playbackRate, () => {
      Ce();
    }), f(m.lang, (e) => {
      de();
    }), f(m.iconSet, (e) => {
      ce();
    }), f(() => m.fullscreen.isActive, (e) => {
      !e && y.value && t.inFullscreen && L();
    }), f(() => t.playbackRate, (e) => {
      e && i.value === !0 && (l.value.playbackRate = parseFloat(e), s("playbackRate", e));
    }), f(() => t.trackLanguage, (e) => {
      M(), s("trackLanguage", e);
    }), f(() => t.showControls, (e) => {
      y.value && !t.noControls && s("showControls", e);
    }), f(() => t.volume, (e) => {
      if (i.value === !0) {
        const n = parseFloat(e / 100);
        l.value.volume !== n && (l.value.volume = n, s("volume", e));
      }
    }), f(() => t.muted, (e) => {
      s("muted", e);
    }), f(() => t.currentTime, (e) => {
      i.value === !0 && t.playReady && (isFinite(l.value.duration) && (t.remainingTime = U(l.value.duration - l.value.currentTime)), t.displayTime = U(l.value.currentTime));
    }), f(() => a.bottomControls, (e) => {
      t.bottomControls = e, e && (t.showControls = !0);
    }), f(() => a.noControls, (e) => {
      t.noControls = e, a.nativeControls === !0 && (t.noControls = !0);
    }), Lt(() => {
      S.value = window !== void 0, S.value === !0 && (de(), ce());
    }), Mt(() => {
      S.value === !0 && (L(), document.body.classList.remove("no-scroll"), fe(), et(), pe(), we(), l.value = null);
    });
    function ze(e) {
      if (e && i.value === !0)
        if (Object.prototype.toString.call(e) === "[object FileList]") {
          const n = new FileReader();
          return n.onload = (r) => {
            l.value.src = r.target.result, se(), W(), l.value.load(), t.loading = !1;
          }, n.readAsDataURL(e[0]), !0;
        } else
          console.error("[QMediaPlayer]: loadFileBlob method requires a FileList");
      return !1;
    }
    function C() {
      if (t.noControls) {
        t.showControls = !1;
        return;
      }
      if (t.bottomControls) {
        t.showControls = !0;
        return;
      }
      _.hideControlsTimer && (clearTimeout(_.hideControlsTimer), _.hideControlsTimer = null), t.showControls = !0, I(), a.controlsDisplayTime !== -1 && !a.mobileMode && y.value && (_.hideControlsTimer = setTimeout(() => {
        !dt() && t.inControls !== !0 ? (t.showControls = !1, _.hideControlsTimer = null, I()) : C();
      }, a.controlsDisplayTime));
    }
    function q() {
      if (!t.inControls) {
        if (t.noControls) {
          t.showControls = !1;
          return;
        }
        if (t.bottomControls) {
          t.showControls = !0;
          return;
        }
        _.hideControlsTimer && clearTimeout(_.hideControlsTimer), a.controlsDisplayTime !== -1 && (t.showControls = !1, I()), _.hideControlsTimer = null;
      }
    }
    function De() {
      t.bottomControls || (t.showControls ? q() : C());
    }
    function Ue() {
      i.value === !0 && t.playReady === !0 && (typeof l.value.play() < "u" ? l.value.play().then(() => (t.showBigPlayButton = !1, t.playing = !0, k(), !0)).catch((n) => {
      }) : (l.value.play(), t.showBigPlayButton = !1, t.playing = !0, k()));
    }
    function He() {
      i.value === !0 && t.playReady === !0 && t.playing && (l.value.pause(), t.showBigPlayButton = !0, t.playing = !1);
    }
    function We() {
      t.muted = !0, i.value === !0 && (l.value.muted = t.muted === !0);
    }
    function je() {
      t.muted = !1, i.value === !0 && (l.value.muted = t.muted !== !0);
    }
    function x(e) {
      w(e), i.value === !0 && t.playReady === !0 && (t.playing ? (l.value.pause(), t.showBigPlayButton = !0, t.playing = !1) : typeof l.value.play() < "u" ? l.value.play().then(() => (t.showBigPlayButton = !1, t.playing = !0, k(), !0)).catch((r) => {
      }) : (l.value.play(), t.showBigPlayButton = !1, t.playing = !0, k()));
    }
    function re(e) {
      w(e), t.muted = !t.muted, i.value === !0 && (l.value.muted = t.muted === !0);
    }
    function ie(e) {
      y.value && (w(e), t.inFullscreen ? L() : ue(), s("fullscreen", t.inFullscreen));
    }
    function ue() {
      a.hideFullscreenBtn === !0 || !y.value || t.inFullscreen || m.fullscreen !== void 0 && (t.inFullscreen = !0, m.fullscreen.request(l.value.parentNode), document.body.classList.add("no-scroll"));
    }
    function L() {
      a.hideFullscreenBtn === !0 || !y.value || !t.inFullscreen || m.fullscreen !== void 0 && (t.inFullscreen = !1, m.fullscreen.exit(), document.body.classList.remove("no-scroll"));
    }
    function Ie() {
      return i.value === !0 && t.playReady === !0 ? l.value.currentTime : -1;
    }
    function $e(e) {
      t.playReady && i.value === !0 && isFinite(l.value.duration) && e >= 0 && e <= l.value.duration && (t.currentTime = l.value.currentTime = e);
    }
    function Ke(e) {
      e >= 0 && e <= 100 && (t.volume = e);
    }
    function se() {
      _.hideControlsTimer && !t.bottomControls && clearTimeout(_.hideControlsTimer), _.hideControlsTimer = null, t.errorText = null, t.currentTime = 0.01, t.durationTime = "00:00", t.remainingTime = "00:00", t.displayTime = "00:00", t.duration = 1, t.playReady = !1, t.playing = !1, t.loading = !0, t.metadataLoaded = !1, P(), C();
    }
    function M() {
      Ge(t.trackLanguage);
    }
    function Ge(e) {
      if (i.value === !0 && y.value)
        for (let n = 0; n < l.value.textTracks.length; ++n)
          l.value.textTracks[n].label === e ? (l.value.textTracks[n].mode = "showing", l.value.textTracks[n].oncuechange = tt) : (l.value.textTracks[n].mode = "hidden", l.value.textTracks[n].oncuechange = null);
    }
    function w(e) {
      e && (e.cancelable !== !1 && e.preventDefault(), e.stopPropagation());
    }
    async function de() {
      const e = m.lang.isoName || "en-US";
      let n;
      try {
        n = await Je(e);
      } catch {
      }
      n !== void 0 && n.lang !== void 0 && (d.mediaPlayer = { ...n.mediaPlayer }, $(), P());
    }
    async function Je(e) {
      let n = {};
      if (e)
        if (window && window.QMediaPlayer && window.QMediaPlayer.Component) {
          const r = e.replace(/-([a-z])/g, (c) => c[1].toUpperCase());
          window.QMediaPlayer.lang && window.QMediaPlayer.lang[r] ? n = window.QMediaPlayer.lang[r] : (console.error(`[QMediaPlayer]: No language loaded called '${e}'`), console.error("[QMediaPlayer]: Be sure to load the UMD version of the language in a script tag before using with UMD"));
        } else
          try {
            n = (await import(
              /* webpackChunkName: "[request]" */
              `@quasar/quasar-ui-qmediaplayer/src/components/lang/${e}.js`
            )).default;
          } catch {
            console.error(`[QMediaPlayer]: Cannot find language file called '${e}'`);
          }
      return n;
    }
    async function ce() {
      const e = m.iconSet.name || "material-icons";
      let n;
      try {
        n = await Xe(e);
      } catch {
      }
      n !== void 0 && n.name !== void 0 && (v.mediaPlayer = { ...n.mediaPlayer });
    }
    async function Xe(e) {
      let n = {};
      if (e)
        if (window && window.QMediaPlayer && window.QMediaPlayer.Component) {
          const r = e.replace(/-([a-z])/g, (c) => c[1].toUpperCase());
          window.QMediaPlayer.iconSet && window.QMediaPlayer.iconSet[r] ? n = window.QMediaPlayer.iconSet[r] : (console.error(`[QMediaPlayer]: No icon set loaded called '${e}'`), console.error("[QMediaPlayer]:Be sure to load the UMD version of the icon set in a script tag before using with UMD"));
        } else
          try {
            n = (await import(
              /* webpackChunkName: "[request]" */
              `@quasar/quasar-ui-qmediaplayer/src/components/icon-set/${e}.js`
            )).default;
          } catch {
            console.error(`[QMediaPlayer]: Cannot find icon set file called '${e}'`);
          }
      return n;
    }
    function Ye() {
      t.bottomControls = a.bottomControls, t.noControls = a.noControls, a.nativeControls === !0 && (t.noControls = !0), P(), K(), G(), _e(), he(), be(), $(), Ce(), a.crossOrigin && i.value === !0 && l.value.setAttribute("crossorigin", a.crossOrigin), i.value === !0 && (l.value.controls = !1), Ze(), W(), M();
    }
    function Ze() {
      i.value === !0 && ne.forEach((e) => {
        l.value.addEventListener(e, ye);
      });
    }
    function et() {
      i.value === !0 && ne.forEach((e) => {
        l.value.removeEventListener(e, ye);
      });
    }
    function W() {
      if (i.value === !0) {
        const e = l.value.querySelectorAll("source");
        for (let n = 0; n < e.length; ++n)
          e[n].addEventListener("error", me);
      }
    }
    function fe() {
      if (i.value === !0) {
        const e = l.value.querySelectorAll("source");
        for (let n = 0; n < e.length; ++n)
          e[n].removeEventListener("error", me);
      }
    }
    function me(e) {
      i.value === !0 && l.value.networkState === 3 && (t.errorText = y.value ? d.mediaPlayer.noLoadVideo : d.mediaPlayer.noLoadAudio, t.loading = !1), s("networkState", e);
    }
    function ye(e) {
      if (e.type === "abort")
        s("abort");
      else if (e.type === "canplay")
        t.playReady = !0, t.displayTime = U(l.value.currentTime), C(), s("ready");
      else if (e.type === "canplaythrough")
        s("canplaythrough");
      else if (e.type === "durationchange")
        isFinite(l.value.duration) && (t.duration = l.value.duration, t.durationTime = U(l.value.duration), s("duration", l.value.duration));
      else if (e.type === "emptied")
        s("emptied");
      else if (e.type === "ended")
        t.playing = !1, s("ended");
      else if (e.type === "error") {
        const n = l.value.error;
        t.errorText = n && n.message ? n.message : null, t.playing = !1, t.loading = !1, s("error", n);
      } else
        e.type === "interruptbegin" || e.type === "interruptend" || (e.type === "loadeddata" ? (t.loading = !1, s("loadeddata")) : e.type === "loadedmetadata" ? (t.metadataLoaded = !0, G(), P(), M(), s("loadedmetadata")) : e.type === "stalled" ? s("stalled") : e.type === "suspend" ? s("suspend") : e.type === "loadstart" ? s("loadstart") : e.type === "pause" ? (t.playing = !1, s("paused")) : e.type === "play" ? s("play") : e.type === "playing" ? (t.playing = !0, s("playing")) : e.type === "progress" || e.type === "ratechange" || e.type === "seeked" || (e.type === "timeupdate" ? (t.currentTime = l.value.currentTime, s("timeupdate", l.value.currentTime, t.remainingTime)) : e.type === "volumechange" || e.type === "waiting" && s("waiting")));
    }
    function j(e, n) {
      const r = {};
      return n !== void 0 && (typeof n == "string" ? e === "style" ? n.replace(/\s+/g, "").split(";").forEach((b) => {
        if (b !== "") {
          const Te = b.split(":");
          r[Te[0]] = Te[1];
        }
      }) : e === "class" && n.split(" ").forEach((b) => {
        b.replace(/\s+/g, "") !== "" && (r[b] = !0);
      }) : Object.assign(r, n)), r;
    }
    function tt(e) {
    }
    function I() {
      i.value === !0 && (t.inFullscreen && t.playing && !t.showControls ? (l.value.classList.remove("cursor-inherit"), l.value.classList.add("cursor-none")) : (l.value.classList.remove("cursor-none"), l.value.classList.add("cursor-inherit")));
    }
    function F() {
      const e = ae.value;
      e && setTimeout(() => {
        e.updatePosition();
      }, 350);
    }
    function at(e) {
      w(e), a.mobileMode !== !0 && x();
    }
    function nt(e) {
      w(e), a.mobileMode && q(), x();
    }
    function ve(e) {
      H.value = e;
    }
    function k(e) {
      e.relatedTarget && e.relatedTarget.className === "q-pa-md" && !a.bottomControls && !a.mobileMode && !R.value && t.inControls !== !0 && q();
    }
    function lt(e) {
      !a.bottomControls && !a.mobileMode && !R.value && ot(e);
    }
    function ge(e, n) {
      return e ? String(e.className).startsWith(n) ? e : ge(e.offsetParent, n) : null;
    }
    function ot(e) {
      const n = l.value.getBoundingClientRect(), r = ge(e.target, "q-media");
      if (r) {
        var c = r.getBoundingClientRect();
        return !n || !c ? !1 : c.left === n.left && c.top === n.top && c.height === n.height && c.width === n.width ? (C(), !0) : !1;
      }
    }
    function rt(e) {
      C(), i.value === !0 && l.value.duration && e && e > 0 && e <= t.duration && l.value.currentTime !== e && (t.currentTime = l.value.currentTime = e);
    }
    function it(e) {
      C(), t.volume = e;
    }
    function ut(e) {
      t.trackLanguage !== e && (t.trackLanguage = e);
    }
    function st(e) {
      t.playbackRate !== e && (t.playbackRate = e);
    }
    function dt() {
      return H.value;
    }
    function _e() {
      t.showBigPlayButton !== a.showBigPlayButton && (t.showBigPlayButton = a.showBigPlayButton);
    }
    function he() {
      t.volume !== a.volume && (t.volume = a.volume);
    }
    function be() {
      t.muted !== a.muted && (t.muted = a.muted, i.value === !0 && (l.value.muted = t.muted));
    }
    function P() {
      (t.trackLanguage !== a.trackLanguage || d.mediaPlayer.trackLanguageOff) && (t.trackLanguage = a.trackLanguage || d.mediaPlayer.trackLanguageOff);
    }
    function $() {
      a.playbackRates && a.playbackRates.length > 0 ? t.playbackRates = [...a.playbackRates] : (t.playbackRates.splice(0, t.playbackRates.length), t.playbackRates.push({ label: d.mediaPlayer.ratePoint5, value: 0.5 }), t.playbackRates.push({ label: d.mediaPlayer.rateNormal, value: 1 }), t.playbackRates.push({ label: d.mediaPlayer.rate1Point5, value: 1.5 }), t.playbackRates.push({ label: d.mediaPlayer.rate2, value: 2 })), t.trackLanguage = d.mediaPlayer.trackLanguageOff;
    }
    function Ce() {
      t.playbackRate !== a.playbackRate && (t.playbackRate = a.playbackRate);
    }
    function K() {
      we(), ct();
    }
    function we() {
      if (i.value === !0) {
        fe(), l.value.pause(), l.value.src = "", l.value.currentTime && (l.value.currentTime = 0);
        const e = l.value.childNodes;
        for (let n = e.length - 1; n >= 0; --n)
          e[n].tagName === "SOURCE" && l.value.removeChild(e[n]);
        l.value.load();
      }
    }
    function ct() {
      if (i.value === !0) {
        let e = !1;
        a.source && a.source.length > 0 ? (l.value.src = a.source, e = !0) : a.sources.length > 0 && a.sources.forEach((n) => {
          const r = document.createElement("SOURCE");
          r.src = n.src ? n.src : "", r.type = n.type ? n.type : "", l.value.appendChild(r), !e && n.src && (l.value.src = n.src, e = !0);
        }), se(), W(), l.value.load();
      }
    }
    function G() {
      pe(), ft();
    }
    function pe() {
      if (i.value === !0) {
        const e = l.value.childNodes;
        for (let n = e.length - 1; n >= 0; --n)
          e[n].tagName === "TRACK" && l.value.removeChild(e[n]);
      }
    }
    function ft() {
      y.value && i.value === !0 && (a.tracks.forEach((e) => {
        const n = document.createElement("TRACK");
        n.kind = e.kind ? e.kind : "", n.label = e.label ? e.label : "", n.src = e.src ? e.src : "", n.srclang = e.srclang ? e.srclang : "", l.value.appendChild(n);
      }), J(() => {
        M();
      }));
    }
    function mt() {
      i.value === !0 && a.poster && (l.value.poster = a.poster);
    }
    function yt() {
      return l.value ? l.value.clientTop + (l.value.clientHeight / 2).toFixed(2) - 24 + "px" : "50%";
    }
    function vt() {
      t.inControls = !0;
    }
    function gt() {
      t.inControls = !1;
    }
    function _t() {
      const e = u.oldbrowser, n = {
        poster: a.poster ? a.poster : !1,
        preload: a.preload,
        playsinline: a.playsinline === !0,
        loop: a.loop === !0,
        autoplay: a.autoplay === !0,
        muted: a.muted === !0,
        width: a.contentWidth || void 0,
        height: a.contentHeight || void 0
      };
      return J(() => {
        i.value && a.nativeControls === !0 && (l.value.controls = !0);
      }).catch((r) => console.error(r)), o("video", {
        ref: l,
        class: {
          ...Ee.value,
          ...j("class", a.contentClass)
        },
        style: {
          ...Ae.value
        },
        ...n
      }, Z(e, o("p", d.mediaPlayer.oldBrowserVideo)));
    }
    function ht() {
      const e = u.oldbrowser, n = {
        poster: a.poster ? a.poster : !1,
        preload: a.preload,
        playsinline: a.playsinline === !0,
        loop: a.loop === !0,
        autoplay: a.autoplay === !0,
        muted: a.muted === !0,
        width: a.contentWidth || void 0,
        height: a.contentHeight || void 0
      };
      return J(() => {
        i.value && a.nativeControls === !0 && (l.value.controls = !0);
      }).catch((r) => console.error(r)), o(a.noVideo === !0 ? "audio" : "video", {
        ref: l,
        class: {
          "q-media--player": !0,
          ...j("class", a.contentClass)
        },
        style: a.contentStyle,
        ...n
      }, Z(e, o("p", d.mediaPlayer.oldBrowserAudio)));
    }
    function bt() {
      if (u.overlay)
        return o("div", {
          class: "q-media__overlay-window fit"
        }, u.overlay());
    }
    function Ct() {
      return o(B, {
        class: "q-media__error-window--button",
        onClick: () => {
          t.errorText = null;
        },
        icon: Nt,
        flat: !0,
        size: "sm"
      });
    }
    function wt() {
      const e = u.errorWindow;
      return o("div", {
        class: "q-media__error-window"
      }, Z(e, o("span", [t.errorText, Ct()])));
    }
    function E() {
      if (a.hidePlayBtn === !0)
        return;
      const e = u.play, n = {
        icon: t.playing ? v.mediaPlayer.pause : v.mediaPlayer.play,
        size: "1rem",
        disable: !t.playReady,
        flat: !0,
        padding: "4px"
      }, r = {
        onClick: x
      };
      return e && e() || o(B, {
        class: "q-media__controls--button play-button",
        ...n,
        ...r
      }, () => [
        a.showTooltips && t.playing && o(h, () => d.mediaPlayer.pause),
        a.showTooltips && !t.playing && t.playReady && o(h, () => d.mediaPlayer.play)
      ]);
    }
    function pt() {
      const e = u.controls, n = {
        onClick: w,
        onMouseenter: vt,
        onMouseleave: gt
      };
      return e ? o(
        "div",
        {
          ref: p,
          class: {
            "q-media__controls": !0,
            "q-media__controls--overlay": y.value === !0 && t.bottomControls !== !0,
            ...le.value
          },
          ...n
        },
        e()
      ) : o("div", {
        ref: p,
        class: {
          "q-media__controls": !0,
          "q-media__controls--overlay": y.value === !0 && t.bottomControls !== !0,
          ...le.value
        },
        ...n
      }, [
        // dense
        a.dense && o("div", {
          class: "q-media__controls--row row col content-start items-center"
        }, [
          o("div", [
            E(),
            a.showTooltips && !t.playReady && o(h, () => d.mediaPlayer.waitingVideo)
          ]),
          Q(),
          A(),
          O(),
          N(),
          V(),
          ke(),
          m.fullscreen !== void 0 && a.hideFullscreenBtn !== !0 && Pe()
        ]),
        // sparse
        !a.dense && o("div", {
          class: "q-media__controls--row row col items-center justify-between"
        }, [
          O(),
          N(),
          V()
        ]),
        !a.dense && o("div", {
          class: "q-media__controls--row row col content-start items-center"
        }, [
          o("div", {
            class: "row col"
          }, [
            o("div", [
              E(),
              a.showTooltips && !t.playReady && o(h, () => d.mediaPlayer.waitingVideo)
            ]),
            Q(),
            A()
          ]),
          o("div", [
            ke(),
            m.fullscreen !== void 0 && a.hideFullscreenBtn !== !0 && Pe()
          ])
        ])
      ]);
    }
    function kt() {
      const e = u.controls;
      return e && e() || o("div", {
        ref: p,
        class: {
          "q-media__controls": !0,
          ...Qe.value
        }
      }, [
        a.dense && o("div", {
          class: "q-media__controls--row row col content-start items-center"
        }, [
          // dense
          o("div", [
            E(),
            a.showTooltips && !t.playReady && o(h, () => d.mediaPlayer.waitingAudio)
          ]),
          Q(),
          A(),
          O(),
          N(),
          V()
        ]),
        // sparse
        !a.dense && o("div", {
          class: "q-media__controls--row row col items-center justify-between"
        }, [
          O(),
          N(),
          V()
        ]),
        !a.dense && o("div", {
          class: "q-media__controls--row row col content-start items-center"
        }, [
          o("div", [
            E(),
            a.showTooltips && !t.playReady && o(h, () => d.mediaPlayer.waitingAudio)
          ]),
          Q(),
          A()
        ])
      ]);
    }
    function Q() {
      if (a.hideVolumeBtn === !0)
        return;
      const e = u.volume, n = {
        icon: Ne.value,
        size: "1rem",
        disable: !t.playReady,
        flat: !0,
        padding: "4px"
      }, r = {
        onClick: re
      };
      return e && e() || o(B, {
        class: "q-media__controls--button volume-button",
        style: {
          color: a.dark === !0 || m.dark.isActive ? "var(--mediaplayer-color-dark)" : "var(--mediaplayer-color)"
        },
        ...n,
        ...r
      }, () => [
        a.showTooltips === !0 ? t.muted === !0 ? o(h, () => d.mediaPlayer.unmute) : o(h, () => d.mediaPlayer.mute) : void 0
      ]);
    }
    function A() {
      if (a.hideVolumeSlider === !0 || a.hideVolumeBtn === !0)
        return;
      const e = u.volumeSlider, n = {
        modelValue: t.volume,
        dark: a.dark,
        min: 0,
        max: 100,
        disable: !t.playReady || t.muted
      }, r = {
        onChange: it
      };
      return e && e() || o(Se, {
        class: "col",
        style: {
          width: "20%",
          margin: "0 0.5rem",
          minWidth: a.dense ? "20px" : "50px",
          maxWidth: a.dense ? "50px" : "200px",
          color: a.dark === !0 || m.dark.isActive ? "var(--mediaplayer-color-dark)" : "var(--mediaplayer-color)"
        },
        ...n,
        ...r
      });
    }
    function ke() {
      if (a.hideSettingsBtn === !0)
        return;
      const e = u.settings, n = {
        icon: v.mediaPlayer.settings,
        size: "1rem",
        disable: !t.playReady,
        flat: !0,
        padding: "4px"
      };
      return e && e() || o(B, {
        class: "q-media__controls--button settings-button",
        ...n
      }, () => [
        a.showTooltips === !0 && !H.value ? o(h, () => d.mediaPlayer.settings) : void 0,
        St()
      ]);
    }
    function Pe() {
      const e = u.fullscreen, n = {
        icon: t.inFullscreen ? v.mediaPlayer.fullscreenExit : v.mediaPlayer.fullscreen,
        size: "1rem",
        disable: !t.playReady,
        flat: !0,
        padding: "4px"
      }, r = {
        onClick: ie
      };
      return e && e() || o(B, {
        class: "q-media__controls--button fullscreen-button",
        ...n,
        ...r
      }, () => [
        a.showTooltips === !0 ? o(h, () => d.mediaPlayer.toggleFullscreen) : void 0
      ]);
    }
    function Pt() {
      a.spinnerSize === void 0 ? y.value ? t.spinnerSize = "3em" : t.spinnerSize = "1.5em" : t.spinnerSize = a.spinnerSize;
      const e = u.spinner;
      return e && e() || o("div", {
        class: y.value ? "q-media__loading--video" : "q-media__loading--audio"
      }, [
        o(Qt, {
          size: t.spinnerSize
        })
      ]);
    }
    function Tt() {
      const e = u.bigPlayButton, n = {
        onClick: nt
      };
      return e && e() || o("div", {
        class: {
          "q-media--big-button q-media--big-button-bottom-controls": t.bottomControls === !0,
          "q-media--big-button": t.bottomControls !== !0
        },
        style: {
          top: yt()
        }
      }, [
        o(Y, {
          name: v.mediaPlayer.bigPlayButton,
          class: "q-media--big-button-icon",
          ...n
        })
      ]);
    }
    function N() {
      const e = u.positionSlider, n = {
        modelValue: t.currentTime,
        dark: a.dark,
        min: 0,
        max: t.duration ? t.duration : 1,
        disable: !t.playReady || a.disabledSeek
      }, r = {
        onChange: rt
      };
      return e && e() || o(Se, {
        class: "col",
        style: {
          margin: "0 0.5rem",
          color: a.dark === !0 || m.dark.isActive ? "var(--mediaplayer-color-dark)" : "var(--mediaplayer-color)"
        },
        ...n,
        ...r
      });
    }
    function O() {
      const e = u.displayTime;
      return e && e() || o("span", {
        class: "q-media__controls--video-time-text text-left",
        style: {
          color: a.dark === !0 || m.dark.isActive ? "var(--mediaplayer-color-dark)" : "var(--mediaplayer-color)"
        }
      }, t.displayTime);
    }
    function V() {
      if (i.value !== !0)
        return;
      const e = u.durationTime, n = !isFinite(l.value.duration);
      return e && e() || o("span", {
        class: "q-media__controls--video-time-text text-right",
        style: {
          width: n ? "30px" : "auto",
          color: a.dark === !0 || m.dark.isActive ? "var(--mediaplayer-color-dark)" : "var(--mediaplayer-color)"
        }
      }, [
        i.value === !0 && n !== !0 && t.durationTime,
        i.value === !0 && n === !0 && Bt()
      ]);
    }
    function Bt() {
      return o("svg", {
        height: "16",
        viewbox: "0 0 16 16"
      }, [
        o("path", {
          fill: "none",
          color: a.dark === !0 || m.dark.isActive ? "var(--mediaplayer-color-dark)" : "var(--mediaplayer-color)",
          strokeWidth: "2",
          d: "M8,8 C16,0 16,16 8,8 C0,0 0,16 8,8z"
        })
      ]);
    }
    function St() {
      const e = u.settingsMenu;
      return o(At, {
        ref: ae,
        ...{
          anchor: "top right",
          self: "bottom right"
        },
        ...{
          onShow: () => {
            ve(!0);
          },
          onHide: () => {
            ve(!1);
          }
        }
      }, () => [
        e && e() || o("div", [
          t.playbackRates.length > 0 && o(Re, {
            // props
            group: "settings-menu",
            expandSeparator: !0,
            icon: v.mediaPlayer.speed,
            label: d.mediaPlayer.speed,
            caption: Oe.value,
            // events
            onShow: F,
            onHide: F
          }, () => [
            o(qe, {
              // props
              highlight: !0
            }, () => [
              t.playbackRates.map((c) => Be(o(xe, {
                // attrs
                key: c.value,
                // props
                clickable: !0,
                dense: !0,
                // events
                onClick: (b) => {
                  w(b), st(c.value);
                }
              }, () => [
                o(D, {
                  // props
                  avatar: !0
                }, () => [
                  c.value === t.playbackRate && o(Y, {
                    // props
                    name: v.mediaPlayer.selected
                  })
                ]),
                o(D, () => c.label)
              ]), [[
                X
              ]]))
            ])
          ]),
          // first item is 'Off' and doesn't count unless more are added
          oe.value.length > 1 && o(Re, {
            // props
            group: "settings-menu",
            expandSeparator: !0,
            icon: v.mediaPlayer.language,
            label: d.mediaPlayer.language,
            caption: t.trackLanguage,
            // events
            onShow: F,
            onHide: F
          }, () => [
            o(qe, {
              // props
              highlight: !0
            }, () => [
              oe.value.map((c) => Be(o(xe, {
                // attrs
                key: c.value,
                // props
                clickable: !0,
                dense: !0,
                // events
                onClick: (b) => {
                  w(b), ut(c.value);
                }
              }, () => [
                o(D, {
                  // props
                  avatar: !0
                }, () => [
                  c.value === t.trackLanguage && o(Y, {
                    // props
                    name: v.mediaPlayer.selected
                  })
                ]),
                o(D, () => c.label)
              ]), [[
                X
              ]]))
            ])
          ])
        ])
      ]);
    }
    function Rt() {
      const e = {
        onMousemove: lt,
        onMouseleave: k,
        onClick: at
      };
      return o("div", {
        class: {
          "q-media--dark": a.dark === !0,
          "q-media": !0,
          ...Fe.value
        },
        style: {
          borderRadius: t.inFullscreen ? 0 : a.radius,
          height: y.value ? "auto" : a.dense ? "40px" : "80px"
        },
        ...e
      }, S.value === !0 ? [
        y.value && _t(),
        R.value && ht(),
        bt(),
        t.errorText && wt(),
        y.value && !t.noControls && !t.errorText && pt(),
        R.value && !t.noControls && !t.errorText && kt(),
        a.showSpinner === !0 && t.loading && !t.playReady && !t.errorText && Pt(),
        y.value && a.showBigPlayButton && t.playReady && !t.playing && Tt()
      ] : void 0);
    }
    return Me({
      loadFileBlob: ze,
      showControls: C,
      hideControls: q,
      toggleControls: De,
      play: Ue,
      pause: He,
      mute: We,
      unmute: je,
      togglePlay: x,
      toggleMuted: re,
      toggleFullscreen: ie,
      setFullscreen: ue,
      exitFullscreen: L,
      currentTime: Ie,
      setCurrentTime: $e,
      setVolume: Ke,
      $media: l
    }), () => Rt();
  }
});
const Ot = "2.0.0-beta.6";
var Wt = {
  version: Ot,
  QMediaPlayer: ee,
  install(a) {
    a.component(ee.name, ee);
  }
};
export {
  ee as QMediaPlayer,
  Wt as default,
  Ot as version
};
