# encoding: utf-8
"""
默认处理器
@author Yuriseus
@create 2016-8-1 15:20
"""
from tornado.web import RequestHandler
from coffeebean.db import SQLAlchemy
from .session import Session
from .log import logger
from .cache import Cache


class BaseRequestHandler(RequestHandler):
    def __init__(self, application, request, **kwargs):
        super(BaseRequestHandler, self).__init__(application, request, **kwargs)
        self.session = Session(self.application.session_manager, self)
        self.logger = logger
        self.cache = Cache.current()

    def set_default_headers(self):
        self.set_header('Access-Control-Allow-Origin', '*')
        self.set_header('Access-Control-Allow-Headers', '*')
        self.set_header('Access-Control-Allow-Methods', 'GET,HEAD,POST,DELETE,PATCH,PUT,OPTIONS')
        self.set_header('Access-Control-Max-Age', 1000)
        self.set_header('Content-Type', 'application/json; charset=UTF-8')

    def initialize(self):
        SQLAlchemy.instance().init_session()

    def prepare(self):
        for interceptor_method in self.application.interceptor_intercept:
            return_value = interceptor_method(self)
            if return_value:    # 拦截器有返回值，终止后续的拦截器
                break

    def on_finish(self):
        SQLAlchemy.instance().close_session()

    def options(self):
        # TODO 调用delete为毛先执行options??
        pass



