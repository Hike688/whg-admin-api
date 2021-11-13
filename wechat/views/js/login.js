var app = new Vue({
        el: "#app",
        data: {
            phone: '',
            code: '',
            btnTitle: "获取验证码",
            disabled: false
        },
        methods: {
            present() {
                if (!/^1[345678]\d{9}$/.test(this.$refs.phone.value)) {
                    this.$toast('请输入正确的手机号')
                    return false
                }
                if (this.$refs.code.value == '') {
                    this.$toast('请输入验证码')
                    return false
                }
                this.$http.post('https://hfmtool.staff.xdf.cn/hl/free/recruit/saveUserInfo', {
                    studentName: this.$refs.name.value,
                    phone: this.$refs.phone.value,
                    smsCode: this.$refs.code.value
                }).then(res => {
                    if (res.data.code == '1') {
                        // this.$store.state.studentName = res.data.data.studentName
                        this.$router.push({
                            name: 'StepOne'
                        })
                    } else {
                        this.$toast(res.data.message);
                    }
                })
            },
            // 获取验证码
            getCode() {
                if (!/^1[345678]\d{9}$/.test(this.$refs.phone.value)) {
                    this.$toast('手机号码错误');
                } else {
                    this.validateBtn()
                    this.$http.post('https://hfmtool.staff.xdf.cn/hl/free/recruit/sendPhoneVerifyCode', {
                        phone: this.$refs.phone.value
                    }).then(res => {
                        // console.log(res)
                        if (res.data.code == '1') {
                            this.$toast("验证码已发送，请注意查收。");
                        } else {
                            this.$toast(res.data.message);
                        }
                    })
                }
            },
            validateBtn() {
                console.log(this);
                //倒计时
                let time = 60;
                let timer = setInterval(() => {
                    if (time == 0) {
                        clearInterval(timer);
                        this.disabled = false;
                        this.btnTitle = "获取验证码";
                    } else {
                        this.btnTitle = time + '秒后重试';
                        this.disabled = true;
                        time--
                    }
                }, 1000)
            }

        }
    })
    /* 
        {data() {
            return {
                name: '',
                phone: '',
                code: '',
                btnTitle: '获取验证码',
                disabled: false,
            }
        },
        methods: {
            // 开始模拟
            present() {
                if (this.$refs.name.value == '') {
                    this.$toast('请输入用户名');
                    return false
                }
                if (!/^1[345678]\d{9}$/.test(this.$refs.phone.value)) {
                    this.$toast('请输入正确的手机号')
                    return false
                }
                if (this.$refs.code.value == '') {
                    this.$toast('请输入验证码')
                    return false
                }
                this.$http.post('https://hfmtool.staff.xdf.cn/hl/free/recruit/saveUserInfo', {
                    studentName: this.$refs.name.value,
                    phone: this.$refs.phone.value,
                    smsCode: this.$refs.code.value
                }).then(res => {
                    if (res.data.code == '1') {
                        // this.$store.state.studentName = res.data.data.studentName
                        this.$router.push({
                            name: 'StepOne'
                        })
                    } else {
                        this.$toast(res.data.message);
                    }
                })
            },
            // 获取验证码
            getCode() {
                if (!/^1[345678]\d{9}$/.test(this.$refs.phone.value)) {
                    this.$toast('手机号码错误');
                } else {
                    this.validateBtn()
                    this.$http.post('https://hfmtool.staff.xdf.cn/hl/free/recruit/sendPhoneVerifyCode', {
                        phone: this.$refs.phone.value
                    }).then(res => {
                        // console.log(res)
                        if (res.data.code == '1') {
                            this.$toast("验证码已发送，请注意查收。");
                        } else {
                            this.$toast(res.data.message);
                        }
                    })
                }
            },
            validateBtn() {
                //倒计时
                let time = 60;
                let timer = setInterval(() => {
                    if (time == 0) {
                        clearInterval(timer);
                        this.disabled = false;
                        this.btnTitle = "获取验证码";
                    } else {
                        this.btnTitle = time + '秒后重试';
                        this.disabled = true;
                        time--
                    }
                }, 1000)
            },

        },
        created() {}
    } */