'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _zanLoadmore = require('./../../components/zan-loadmore.js');

var _zanLoadmore2 = _interopRequireDefault(_zanLoadmore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StatisticsError = function (_wepy$page) {
  _inherits(StatisticsError, _wepy$page);

  function StatisticsError() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, StatisticsError);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = StatisticsError.__proto__ || Object.getPrototypeOf(StatisticsError)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
      revise: {
        array: [{
          id: 0,
          name: '又错了'
        }, {
          id: 1,
          name: '搞对了'
        }]
      },
      offset: '',
      error: [],
      count: 0,
      id: '',
      scrollHeight: 500,
      loading: true,
      nomore: false
    }, _this.$repeat = {}, _this.$props = { "zanLoadmore1": { "xmlns:v-bind": "", "v-bind:loading.sync": "loading", "v-bind:nomore.sync": "nomore" } }, _this.$events = {}, _this.components = {
      zanLoadmore1: _zanLoadmore2.default
    }, _this.methods = {
      /** 显示错误次数 */
      _count: function _count(count) {
        if (Number(count)) {
          _wepy2.default.showToast({
            title: '\u8BE5\u9898\u76EE\u8BA2\u6B63' + count + '\u6B21',
            icon: 'none',
            duration: 2000
          });
        }
      },

      /** 更改订正状态 */
      _reviseChange: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {
          var _this2 = this;

          var index, status;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  console.log(e.target.val);
                  console.log(e.target.dataset.current);
                  index = e.target.dataset.current; // 获取当前索引

                  status = Boolean(Number(e.detail.value)).toString();

                  this._setRevise(this.id, this.error[index], status).then(function (res) {
                    _this2.error[index].count = res.count;
                    _this2.error[index].revise = res.status;
                    _this2.$apply();
                  });

                case 5:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function _reviseChange(_x) {
          return _ref2.apply(this, arguments);
        }

        return _reviseChange;
      }(),

      /** 加载更多 */
      _loadMore: function _loadMore() {
        var _this3 = this;

        // 无更多数据或者正在加载则返回
        if (this.loading || this.nomore) return;
        this.loading = true;
        this._getErrorList(this.id, this.offset).then(function (res) {
          _this3.loading = false;
          _this3.error = _this3.error.concat(res.errorList);
          _this3.offset = res.offset;
          _this3.count = res.number;
          if (_this3.offset.length === 0) {
            _this3.nomore = true;
          }
          _this3.$apply();
        }).catch(function () {
          _this3.nomore = true;
          _this3.loading = false;
          _this3.$apply();
        });
      },

      /** 查看大图 */
      _preview: function _preview(url) {
        _wepy2.default.previewImage({ current: url + '-primaryError', urls: this.imgs });
      },

      /** 下载错题 */
      _download: function _download() {
        // 跳转到筛选
        _wepy2.default.navigateTo({
          url: '/pages/statistics/select?id=' + this.id
        });
      }
    }, _this.computed = {
      /** 图片集 */
      imgs: function imgs() {
        var urls = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.error[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var img = _step.value;

            urls.push(img.errorImg.url + '-primaryError');
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        return urls;
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(StatisticsError, [{
    key: '_getErrorList',


    /** 获取错题数据 */
    value: function _getErrorList(id, offset) {
      return new Promise(function (resolve, reject) {
        _wepy2.default.request({
          url: 'https://small.guinaben.com/v2/textbook/statistics/error',
          data: {
            chapterId: id,
            offset: offset
          },
          success: function success(res) {
            resolve(res);
          },
          fail: function fail(err) {
            reject(err);
          }
        });
      });
    }

    /** 设置错题订正状态 */

  }, {
    key: '_setRevise',
    value: function _setRevise(chapterId, item, status) {
      wx.showLoading({ title: '提交中' });
      return new Promise(function (resolve, reject) {
        _wepy2.default.request({
          url: 'https://small.guinaben.com/v2/textbook/statistics/revise',
          method: 'POST',
          data: {
            chapterId: chapterId,
            id: item.id,
            status: status
          },
          success: function success(res) {
            _wepy2.default.hideLoading();
            resolve(res);
          },
          fail: function fail(err) {
            _wepy2.default.hideLoading();
            reject(err);
          }
        });
      });
    }
  }, {
    key: 'onLoad',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(options) {
        var result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.scrollHeight = this.$parent.globalData.system.windowHeight - 30;
                wx.setNavigationBarTitle({ title: options.name });
                // 开始加载数据
                _context2.prev = 2;

                this.id = options.id;
                _context2.next = 6;
                return this._getErrorList(options.id, this.offset);

              case 6:
                result = _context2.sent;

                this.loading = false;
                this.error = result.errorList;
                this.offset = result.offset;
                this.count = result.number;
                if (this.offset.length === 0) {
                  this.nomore = true;
                }
                this.$apply();
                _context2.next = 20;
                break;

              case 15:
                _context2.prev = 15;
                _context2.t0 = _context2['catch'](2);

                this.loading = false;
                this.nomore = true;
                this.$apply();

              case 20:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[2, 15]]);
      }));

      function onLoad(_x2) {
        return _ref3.apply(this, arguments);
      }

      return onLoad;
    }()
  }, {
    key: 'onShareAppMessage',
    value: function onShareAppMessage(res) {
      if (res.from === 'button') {
        console.log(res.target);
      }
      return {
        title: '各位家长：这样记错题，速度快、好处多',
        imageUrl: 'http://img.guinaben.com/gnb_miniprogram_share.jpg?imageView2/0/q/75|imageslim',
        path: '/pages/workbook/index'
      };
    }
  }]);

  return StatisticsError;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(StatisticsError , 'pages/statistics/error'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVycm9yLmpzIl0sIm5hbWVzIjpbIlN0YXRpc3RpY3NFcnJvciIsImRhdGEiLCJyZXZpc2UiLCJhcnJheSIsImlkIiwibmFtZSIsIm9mZnNldCIsImVycm9yIiwiY291bnQiLCJzY3JvbGxIZWlnaHQiLCJsb2FkaW5nIiwibm9tb3JlIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiemFuTG9hZG1vcmUxIiwibWV0aG9kcyIsIl9jb3VudCIsIk51bWJlciIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsImR1cmF0aW9uIiwiX3JldmlzZUNoYW5nZSIsImUiLCJjb25zb2xlIiwibG9nIiwidGFyZ2V0IiwidmFsIiwiZGF0YXNldCIsImN1cnJlbnQiLCJpbmRleCIsInN0YXR1cyIsIkJvb2xlYW4iLCJkZXRhaWwiLCJ2YWx1ZSIsInRvU3RyaW5nIiwiX3NldFJldmlzZSIsInRoZW4iLCJyZXMiLCIkYXBwbHkiLCJfbG9hZE1vcmUiLCJfZ2V0RXJyb3JMaXN0IiwiY29uY2F0IiwiZXJyb3JMaXN0IiwibnVtYmVyIiwibGVuZ3RoIiwiY2F0Y2giLCJfcHJldmlldyIsInVybCIsInByZXZpZXdJbWFnZSIsInVybHMiLCJpbWdzIiwiX2Rvd25sb2FkIiwibmF2aWdhdGVUbyIsImNvbXB1dGVkIiwiaW1nIiwicHVzaCIsImVycm9ySW1nIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJyZXF1ZXN0IiwiY2hhcHRlcklkIiwic3VjY2VzcyIsImZhaWwiLCJlcnIiLCJpdGVtIiwid3giLCJzaG93TG9hZGluZyIsIm1ldGhvZCIsImhpZGVMb2FkaW5nIiwib3B0aW9ucyIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwic3lzdGVtIiwid2luZG93SGVpZ2h0Iiwic2V0TmF2aWdhdGlvbkJhclRpdGxlIiwicmVzdWx0IiwiZnJvbSIsImltYWdlVXJsIiwicGF0aCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0lBRXFCQSxlOzs7Ozs7Ozs7Ozs7Ozt3TUFDbkJDLEksR0FBTztBQUNMQyxjQUFRO0FBQ05DLGVBQU8sQ0FDTDtBQUNFQyxjQUFJLENBRE47QUFFRUMsZ0JBQU07QUFGUixTQURLLEVBS0w7QUFDRUQsY0FBSSxDQUROO0FBRUVDLGdCQUFNO0FBRlIsU0FMSztBQURELE9BREg7QUFhTEMsY0FBUSxFQWJIO0FBY0xDLGFBQU8sRUFkRjtBQWVMQyxhQUFPLENBZkY7QUFnQkxKLFVBQUksRUFoQkM7QUFpQkxLLG9CQUFjLEdBakJUO0FBa0JMQyxlQUFTLElBbEJKO0FBbUJMQyxjQUFRO0FBbkJILEssUUFzQlJDLE8sR0FBVSxFLFFBQ1hDLE0sR0FBUyxFQUFDLGdCQUFlLEVBQUMsZ0JBQWUsRUFBaEIsRUFBbUIsdUJBQXNCLFNBQXpDLEVBQW1ELHNCQUFxQixRQUF4RSxFQUFoQixFLFFBQ1RDLE8sR0FBVSxFLFFBQ1RDLFUsR0FBYTtBQUNWQztBQURVLEssUUFJWkMsTyxHQUFVO0FBQ1I7QUFDQUMsWUFGUSxrQkFFQVYsS0FGQSxFQUVPO0FBQ2IsWUFBSVcsT0FBT1gsS0FBUCxDQUFKLEVBQW1CO0FBQ2pCLHlCQUFLWSxTQUFMLENBQWU7QUFDYkMsc0RBQWViLEtBQWYsV0FEYTtBQUViYyxrQkFBTSxNQUZPO0FBR2JDLHNCQUFVO0FBSEcsV0FBZjtBQUtEO0FBQ0YsT0FWTzs7QUFXUjtBQUNNQyxtQkFaRTtBQUFBLDZGQVlhQyxDQVpiO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQWFOQywwQkFBUUMsR0FBUixDQUFZRixFQUFFRyxNQUFGLENBQVNDLEdBQXJCO0FBQ0FILDBCQUFRQyxHQUFSLENBQVlGLEVBQUVHLE1BQUYsQ0FBU0UsT0FBVCxDQUFpQkMsT0FBN0I7QUFDSUMsdUJBZkUsR0FlTVAsRUFBRUcsTUFBRixDQUFTRSxPQUFULENBQWlCQyxPQWZ2QixFQWVnQzs7QUFDbENFLHdCQWhCRSxHQWdCT0MsUUFBUWYsT0FBT00sRUFBRVUsTUFBRixDQUFTQyxLQUFoQixDQUFSLEVBQWdDQyxRQUFoQyxFQWhCUDs7QUFpQk4sdUJBQUtDLFVBQUwsQ0FBZ0IsS0FBS2xDLEVBQXJCLEVBQXlCLEtBQUtHLEtBQUwsQ0FBV3lCLEtBQVgsQ0FBekIsRUFBNENDLE1BQTVDLEVBQW9ETSxJQUFwRCxDQUF5RCxVQUFDQyxHQUFELEVBQVM7QUFDaEUsMkJBQUtqQyxLQUFMLENBQVd5QixLQUFYLEVBQWtCeEIsS0FBbEIsR0FBMEJnQyxJQUFJaEMsS0FBOUI7QUFDQSwyQkFBS0QsS0FBTCxDQUFXeUIsS0FBWCxFQUFrQjlCLE1BQWxCLEdBQTJCc0MsSUFBSVAsTUFBL0I7QUFDQSwyQkFBS1EsTUFBTDtBQUNELG1CQUpEOztBQWpCTTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUF1QlI7QUFDQUMsZUF4QlEsdUJBd0JLO0FBQUE7O0FBQ1g7QUFDQSxZQUFJLEtBQUtoQyxPQUFMLElBQWdCLEtBQUtDLE1BQXpCLEVBQWlDO0FBQ2pDLGFBQUtELE9BQUwsR0FBZSxJQUFmO0FBQ0EsYUFBS2lDLGFBQUwsQ0FBbUIsS0FBS3ZDLEVBQXhCLEVBQTRCLEtBQUtFLE1BQWpDLEVBQXlDaUMsSUFBekMsQ0FBOEMsVUFBQ0MsR0FBRCxFQUFTO0FBQ3JELGlCQUFLOUIsT0FBTCxHQUFlLEtBQWY7QUFDQSxpQkFBS0gsS0FBTCxHQUFhLE9BQUtBLEtBQUwsQ0FBV3FDLE1BQVgsQ0FBa0JKLElBQUlLLFNBQXRCLENBQWI7QUFDQSxpQkFBS3ZDLE1BQUwsR0FBY2tDLElBQUlsQyxNQUFsQjtBQUNBLGlCQUFLRSxLQUFMLEdBQWFnQyxJQUFJTSxNQUFqQjtBQUNBLGNBQUksT0FBS3hDLE1BQUwsQ0FBWXlDLE1BQVosS0FBdUIsQ0FBM0IsRUFBOEI7QUFDNUIsbUJBQUtwQyxNQUFMLEdBQWMsSUFBZDtBQUNEO0FBQ0QsaUJBQUs4QixNQUFMO0FBQ0QsU0FURCxFQVNHTyxLQVRILENBU1MsWUFBTTtBQUNiLGlCQUFLckMsTUFBTCxHQUFjLElBQWQ7QUFDQSxpQkFBS0QsT0FBTCxHQUFlLEtBQWY7QUFDQSxpQkFBSytCLE1BQUw7QUFDRCxTQWJEO0FBY0QsT0ExQ087O0FBMkNSO0FBQ0FRLGNBNUNRLG9CQTRDRUMsR0E1Q0YsRUE0Q087QUFDYix1QkFBS0MsWUFBTCxDQUFrQixFQUFDcEIsU0FBWW1CLEdBQVosa0JBQUQsRUFBaUNFLE1BQU0sS0FBS0MsSUFBNUMsRUFBbEI7QUFDRCxPQTlDTzs7QUErQ1I7QUFDQUMsZUFoRFEsdUJBZ0RLO0FBQ1g7QUFDQSx1QkFBS0MsVUFBTCxDQUFnQjtBQUNkTCxnREFBb0MsS0FBSzlDO0FBRDNCLFNBQWhCO0FBR0Q7QUFyRE8sSyxRQXdEVm9ELFEsR0FBVztBQUNUO0FBQ0FILFVBRlMsa0JBRUQ7QUFDTixZQUFJRCxPQUFPLEVBQVg7QUFETTtBQUFBO0FBQUE7O0FBQUE7QUFFTiwrQkFBZ0IsS0FBSzdDLEtBQXJCLDhIQUE0QjtBQUFBLGdCQUFuQmtELEdBQW1COztBQUMxQkwsaUJBQUtNLElBQUwsQ0FBYUQsSUFBSUUsUUFBSixDQUFhVCxHQUExQjtBQUNEO0FBSks7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFLTixlQUFPRSxJQUFQO0FBQ0Q7QUFSUSxLOzs7Ozs7O0FBV1g7a0NBQ2VoRCxFLEVBQUlFLE0sRUFBUTtBQUN6QixhQUFPLElBQUlzRCxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDLHVCQUFLQyxPQUFMLENBQWE7QUFDWGIsZUFBSyx5REFETTtBQUVYakQsZ0JBQU07QUFDSitELHVCQUFXNUQsRUFEUDtBQUVKRSxvQkFBUUE7QUFGSixXQUZLO0FBTVgyRCxpQkFOVyxtQkFNRnpCLEdBTkUsRUFNRztBQUNacUIsb0JBQVFyQixHQUFSO0FBQ0QsV0FSVTtBQVNYMEIsY0FUVyxnQkFTTEMsR0FUSyxFQVNBO0FBQ1RMLG1CQUFPSyxHQUFQO0FBQ0Q7QUFYVSxTQUFiO0FBYUQsT0FkTSxDQUFQO0FBZUQ7O0FBRUQ7Ozs7K0JBQ1lILFMsRUFBV0ksSSxFQUFNbkMsTSxFQUFRO0FBQ25Db0MsU0FBR0MsV0FBSCxDQUFlLEVBQUNqRCxPQUFPLEtBQVIsRUFBZjtBQUNBLGFBQU8sSUFBSXVDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdEMsdUJBQUtDLE9BQUwsQ0FBYTtBQUNYYixlQUFLLDBEQURNO0FBRVhxQixrQkFBUSxNQUZHO0FBR1h0RSxnQkFBTTtBQUNKK0QsdUJBQVdBLFNBRFA7QUFFSjVELGdCQUFJZ0UsS0FBS2hFLEVBRkw7QUFHSjZCLG9CQUFRQTtBQUhKLFdBSEs7QUFRWGdDLGlCQVJXLG1CQVFGekIsR0FSRSxFQVFHO0FBQ1osMkJBQUtnQyxXQUFMO0FBQ0FYLG9CQUFRckIsR0FBUjtBQUNELFdBWFU7QUFZWDBCLGNBWlcsZ0JBWUxDLEdBWkssRUFZQTtBQUNULDJCQUFLSyxXQUFMO0FBQ0FWLG1CQUFPSyxHQUFQO0FBQ0Q7QUFmVSxTQUFiO0FBaUJELE9BbEJNLENBQVA7QUFtQkQ7Ozs7NEZBRVlNLE87Ozs7OztBQUNYLHFCQUFLaEUsWUFBTCxHQUFvQixLQUFLaUUsT0FBTCxDQUFhQyxVQUFiLENBQXdCQyxNQUF4QixDQUErQkMsWUFBL0IsR0FBOEMsRUFBbEU7QUFDQVIsbUJBQUdTLHFCQUFILENBQXlCLEVBQUN6RCxPQUFPb0QsUUFBUXBFLElBQWhCLEVBQXpCO0FBQ0E7OztBQUVFLHFCQUFLRCxFQUFMLEdBQVVxRSxRQUFRckUsRUFBbEI7O3VCQUNtQixLQUFLdUMsYUFBTCxDQUFtQjhCLFFBQVFyRSxFQUEzQixFQUErQixLQUFLRSxNQUFwQyxDOzs7QUFBZnlFLHNCOztBQUNKLHFCQUFLckUsT0FBTCxHQUFlLEtBQWY7QUFDQSxxQkFBS0gsS0FBTCxHQUFhd0UsT0FBT2xDLFNBQXBCO0FBQ0EscUJBQUt2QyxNQUFMLEdBQWN5RSxPQUFPekUsTUFBckI7QUFDQSxxQkFBS0UsS0FBTCxHQUFhdUUsT0FBT2pDLE1BQXBCO0FBQ0Esb0JBQUksS0FBS3hDLE1BQUwsQ0FBWXlDLE1BQVosS0FBdUIsQ0FBM0IsRUFBOEI7QUFDNUIsdUJBQUtwQyxNQUFMLEdBQWMsSUFBZDtBQUNEO0FBQ0QscUJBQUs4QixNQUFMOzs7Ozs7OztBQUVBLHFCQUFLL0IsT0FBTCxHQUFlLEtBQWY7QUFDQSxxQkFBS0MsTUFBTCxHQUFjLElBQWQ7QUFDQSxxQkFBSzhCLE1BQUw7Ozs7Ozs7Ozs7Ozs7Ozs7OztzQ0FJZUQsRyxFQUFLO0FBQ3RCLFVBQUlBLElBQUl3QyxJQUFKLEtBQWEsUUFBakIsRUFBMkI7QUFDekJ0RCxnQkFBUUMsR0FBUixDQUFZYSxJQUFJWixNQUFoQjtBQUNEO0FBQ0QsYUFBTztBQUNMUCxlQUFPLG9CQURGO0FBRUw0RCxrQkFBVSwrRUFGTDtBQUdMQyxjQUFNO0FBSEQsT0FBUDtBQUtEOzs7O0VBM0swQyxlQUFLQyxJOztrQkFBN0JuRixlIiwiZmlsZSI6ImVycm9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0IHphbkxvYWRNb3JlIGZyb20gJ0AvY29tcG9uZW50cy96YW4tbG9hZG1vcmUnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YXRpc3RpY3NFcnJvciBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGRhdGEgPSB7XG4gICAgcmV2aXNlOiB7XG4gICAgICBhcnJheTogW1xuICAgICAgICB7XG4gICAgICAgICAgaWQ6IDAsXG4gICAgICAgICAgbmFtZTogJ+WPiOmUmeS6hidcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGlkOiAxLFxuICAgICAgICAgIG5hbWU6ICfmkJ7lr7nkuoYnXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9LFxuICAgIG9mZnNldDogJycsXG4gICAgZXJyb3I6IFtdLFxuICAgIGNvdW50OiAwLFxuICAgIGlkOiAnJyxcbiAgICBzY3JvbGxIZWlnaHQ6IDUwMCxcbiAgICBsb2FkaW5nOiB0cnVlLFxuICAgIG5vbW9yZTogZmFsc2VcbiAgfVxuXG4gJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJ6YW5Mb2FkbW9yZTFcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOmxvYWRpbmcuc3luY1wiOlwibG9hZGluZ1wiLFwidi1iaW5kOm5vbW9yZS5zeW5jXCI6XCJub21vcmVcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xuICAgIHphbkxvYWRtb3JlMTogemFuTG9hZE1vcmVcbiAgfVxuXG4gIG1ldGhvZHMgPSB7XG4gICAgLyoqIOaYvuekuumUmeivr+asoeaVsCAqL1xuICAgIF9jb3VudCAoY291bnQpIHtcbiAgICAgIGlmIChOdW1iZXIoY291bnQpKSB7XG4gICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgICAgICB0aXRsZTogYOivpemimOebruiuouatoyR7Y291bnR95qyhYCxcbiAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgZHVyYXRpb246IDIwMDBcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9LFxuICAgIC8qKiDmm7TmlLnorqLmraPnirbmgIEgKi9cbiAgICBhc3luYyBfcmV2aXNlQ2hhbmdlIChlKSB7XG4gICAgICBjb25zb2xlLmxvZyhlLnRhcmdldC52YWwpXG4gICAgICBjb25zb2xlLmxvZyhlLnRhcmdldC5kYXRhc2V0LmN1cnJlbnQpXG4gICAgICBsZXQgaW5kZXggPSBlLnRhcmdldC5kYXRhc2V0LmN1cnJlbnQgIC8vIOiOt+WPluW9k+WJjee0ouW8lVxuICAgICAgbGV0IHN0YXR1cyA9IEJvb2xlYW4oTnVtYmVyKGUuZGV0YWlsLnZhbHVlKSkudG9TdHJpbmcoKVxuICAgICAgdGhpcy5fc2V0UmV2aXNlKHRoaXMuaWQsIHRoaXMuZXJyb3JbaW5kZXhdLCBzdGF0dXMpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICB0aGlzLmVycm9yW2luZGV4XS5jb3VudCA9IHJlcy5jb3VudFxuICAgICAgICB0aGlzLmVycm9yW2luZGV4XS5yZXZpc2UgPSByZXMuc3RhdHVzXG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIH0pXG4gICAgfSxcbiAgICAvKiog5Yqg6L295pu05aSaICovXG4gICAgX2xvYWRNb3JlICgpIHtcbiAgICAgIC8vIOaXoOabtOWkmuaVsOaNruaIluiAheato+WcqOWKoOi9veWImei/lOWbnlxuICAgICAgaWYgKHRoaXMubG9hZGluZyB8fCB0aGlzLm5vbW9yZSkgcmV0dXJuXG4gICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlXG4gICAgICB0aGlzLl9nZXRFcnJvckxpc3QodGhpcy5pZCwgdGhpcy5vZmZzZXQpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZVxuICAgICAgICB0aGlzLmVycm9yID0gdGhpcy5lcnJvci5jb25jYXQocmVzLmVycm9yTGlzdClcbiAgICAgICAgdGhpcy5vZmZzZXQgPSByZXMub2Zmc2V0XG4gICAgICAgIHRoaXMuY291bnQgPSByZXMubnVtYmVyXG4gICAgICAgIGlmICh0aGlzLm9mZnNldC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB0aGlzLm5vbW9yZSA9IHRydWVcbiAgICAgICAgfVxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgIHRoaXMubm9tb3JlID0gdHJ1ZVxuICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZVxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB9KVxuICAgIH0sXG4gICAgLyoqIOafpeeci+Wkp+WbviAqL1xuICAgIF9wcmV2aWV3ICh1cmwpIHtcbiAgICAgIHdlcHkucHJldmlld0ltYWdlKHtjdXJyZW50OiBgJHt1cmx9LXByaW1hcnlFcnJvcmAsIHVybHM6IHRoaXMuaW1nc30pXG4gICAgfSxcbiAgICAvKiog5LiL6L296ZSZ6aKYICovXG4gICAgX2Rvd25sb2FkICgpIHtcbiAgICAgIC8vIOi3s+i9rOWIsOetm+mAiVxuICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgdXJsOiBgL3BhZ2VzL3N0YXRpc3RpY3Mvc2VsZWN0P2lkPSR7dGhpcy5pZH1gXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIGNvbXB1dGVkID0ge1xuICAgIC8qKiDlm77niYfpm4YgKi9cbiAgICBpbWdzICgpIHtcbiAgICAgIGxldCB1cmxzID0gW11cbiAgICAgIGZvciAobGV0IGltZyBvZiB0aGlzLmVycm9yKSB7XG4gICAgICAgIHVybHMucHVzaChgJHtpbWcuZXJyb3JJbWcudXJsfS1wcmltYXJ5RXJyb3JgKVxuICAgICAgfVxuICAgICAgcmV0dXJuIHVybHNcbiAgICB9XG4gIH1cblxuICAvKiog6I635Y+W6ZSZ6aKY5pWw5o2uICovXG4gIF9nZXRFcnJvckxpc3QgKGlkLCBvZmZzZXQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgICAgdXJsOiAnaHR0cHM6Ly9zbWFsbC5ndWluYWJlbi5jb20vdjIvdGV4dGJvb2svc3RhdGlzdGljcy9lcnJvcicsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBjaGFwdGVySWQ6IGlkLFxuICAgICAgICAgIG9mZnNldDogb2Zmc2V0XG4gICAgICAgIH0sXG4gICAgICAgIHN1Y2Nlc3MgKHJlcykge1xuICAgICAgICAgIHJlc29sdmUocmVzKVxuICAgICAgICB9LFxuICAgICAgICBmYWlsIChlcnIpIHtcbiAgICAgICAgICByZWplY3QoZXJyKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICAvKiog6K6+572u6ZSZ6aKY6K6i5q2j54q25oCBICovXG4gIF9zZXRSZXZpc2UgKGNoYXB0ZXJJZCwgaXRlbSwgc3RhdHVzKSB7XG4gICAgd3guc2hvd0xvYWRpbmcoe3RpdGxlOiAn5o+Q5Lqk5LitJ30pXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICAgIHVybDogJ2h0dHBzOi8vc21hbGwuZ3VpbmFiZW4uY29tL3YyL3RleHRib29rL3N0YXRpc3RpY3MvcmV2aXNlJyxcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBjaGFwdGVySWQ6IGNoYXB0ZXJJZCxcbiAgICAgICAgICBpZDogaXRlbS5pZCxcbiAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICB9LFxuICAgICAgICBzdWNjZXNzIChyZXMpIHtcbiAgICAgICAgICB3ZXB5LmhpZGVMb2FkaW5nKClcbiAgICAgICAgICByZXNvbHZlKHJlcylcbiAgICAgICAgfSxcbiAgICAgICAgZmFpbCAoZXJyKSB7XG4gICAgICAgICAgd2VweS5oaWRlTG9hZGluZygpXG4gICAgICAgICAgcmVqZWN0KGVycilcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgYXN5bmMgb25Mb2FkKG9wdGlvbnMpIHtcbiAgICB0aGlzLnNjcm9sbEhlaWdodCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnN5c3RlbS53aW5kb3dIZWlnaHQgLSAzMFxuICAgIHd4LnNldE5hdmlnYXRpb25CYXJUaXRsZSh7dGl0bGU6IG9wdGlvbnMubmFtZX0pXG4gICAgLy8g5byA5aeL5Yqg6L295pWw5o2uXG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuaWQgPSBvcHRpb25zLmlkXG4gICAgICBsZXQgcmVzdWx0ID0gYXdhaXQgdGhpcy5fZ2V0RXJyb3JMaXN0KG9wdGlvbnMuaWQsIHRoaXMub2Zmc2V0KVxuICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2VcbiAgICAgIHRoaXMuZXJyb3IgPSByZXN1bHQuZXJyb3JMaXN0XG4gICAgICB0aGlzLm9mZnNldCA9IHJlc3VsdC5vZmZzZXRcbiAgICAgIHRoaXMuY291bnQgPSByZXN1bHQubnVtYmVyXG4gICAgICBpZiAodGhpcy5vZmZzZXQubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHRoaXMubm9tb3JlID0gdHJ1ZVxuICAgICAgfVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2VcbiAgICAgIHRoaXMubm9tb3JlID0gdHJ1ZVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxuXG4gIG9uU2hhcmVBcHBNZXNzYWdlIChyZXMpIHtcbiAgICBpZiAocmVzLmZyb20gPT09ICdidXR0b24nKSB7XG4gICAgICBjb25zb2xlLmxvZyhyZXMudGFyZ2V0KVxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgdGl0bGU6ICflkITkvY3lrrbplb/vvJrov5nmoLforrDplJnpopjvvIzpgJ/luqblv6vjgIHlpb3lpITlpJonLFxuICAgICAgaW1hZ2VVcmw6ICdodHRwOi8vaW1nLmd1aW5hYmVuLmNvbS9nbmJfbWluaXByb2dyYW1fc2hhcmUuanBnP2ltYWdlVmlldzIvMC9xLzc1fGltYWdlc2xpbScsXG4gICAgICBwYXRoOiAnL3BhZ2VzL3dvcmtib29rL2luZGV4J1xuICAgIH1cbiAgfVxufVxuIl19