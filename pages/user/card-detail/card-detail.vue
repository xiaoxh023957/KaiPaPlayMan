<template>
	<view>

		<!-- 非年卡用户界面	 -->
		<view v-if="!isVip">
			<cu-custom bgColor="kpbg-black" class="text-white" :isBack="true" ref="backbar">
				<block slot="backText" class="text-white">返回</block>
				<block slot="content" class="text-white">年卡会员</block>
			</cu-custom>

			<view class="kpbg-black" :style="{'height':deviceHeight-backbarHeight+'px'}">
				<scroll-view class=" text-xs text-center padding-xs" scroll-x="true" @scroll="scroll" scroll-left="120" style="width: 100%; position:fixed;height: 25px;"
				 :style="{'background-color':color.yellow,'top':backbarHeight+'px'}">
					<view style="white-space:nowrap;">
						{{yearCards.content}}
					</view>
				</scroll-view>

				<!-- 年卡图片 -->
				<view class="padding-lg" :style="{'padding-top':backbarHeight +'px'}">
					<view class="kp-userContRadius" style="width: 100%; height: 300rpx; background-image: url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg); background-size: 100%; "></view>
				</view>

				<view class=" text-center padding">
					<view :style="{'color':color.yellow}">
						<text style="width:12rpx;height:12rpx;background-image: url(../../../static/star.jpg);"></text>
						开通即享受
					</view>
				</view>

				<view class="tui-btn-btm">

					<view class="grid col-2 text-center padding-lr">

						<view type="white" shape="circle" class="padding-xs" @click="showToast()">
							<view class="radius padding-tb" style="background:rgba(255,255,255,.1); ">
								<view class="text-lg" :style="{'color':color.yellow}">{{yearCards.contentDescA}}</view>
							</view>

						</view>

						<view type="white" shape="circle" class="padding-xs" @click="showToast()">
							<view class="radius padding-tb" style="background:rgba(255,255,255,.1); ">
								<view class="text-lg" :style="{'color':color.yellow}">{{yearCards.contentDescB}}</view>
							</view>

						</view>

						<view type="white" shape="circle" class="padding-xs" @click="showToast()">
							<view class="radius padding-tb" style="background:rgba(255,255,255,.1); ">
								<view class="text-lg" :style="{'color':color.yellow}">{{yearCards.contentDescC}}</view>
							</view>

						</view>

						<view type="white" shape="circle" class="padding-xs" @click="showToast()">
							<view class="radius padding-tb" style="background:rgba(255,255,255,.1); ">
								<view class="text-lg" :style="{'color':color.yellow}">{{yearCards.contentDescD}}</view>
							</view>

						</view>

					</view>
				</view>

				<view class=" text-xs text-center text-grey padding-xs ">
					开通则视为同意<text :style="{'color':color.yellow}" @click="agreementShow()">年卡会员协议</text>
				</view>

				<!-- 年卡协议 -->
				<view class="agreement-mask" v-if='agreementIsShow'>
					<view class="bg-white padding-lg agreement ">
						<view class="text-grey text-lg text-center  padding-bottom-xs">
							年卡用户协议
						</view>
						<view class="text-gray margin-bottom-xl agreement-item">
							欢迎您使用【拼趴】的服务，感谢您对【拼趴】的信任与支持！

							第一条 总则
							1.1 为维护您的权益，请您仔细阅读本《平台用户服务协议》（“本协议”）各条款的具体内容，充分理解其表述的含义。请您务必审慎阅读、充分理解各条款内容，特别是免除或者限制责任的条款、法律适用和争议解决条款。

							1.2
							本协议各条款标题仅为帮助您理解该条款表达的主题之用，不影响或限制该条款的含义或解释。如您对本协议的约定尤其是涉及免除或者责任限制的条款有任何问题，可随时按照本协议列明的联系方式与我们联系，我们将为您进行详细的解释和说明。

							1.3
							当您按照注册页面提示填写信息、阅读并同意本协议且完成全部注册程序，或者以其他任何方式使用或接受【拼趴】提供的任何平台服务（“服务”，具体含义详见下文的定义条款），即表示您已充分阅读、理解并接受本协议项下的全部条款，并成为【拼趴】平台的“用户”，本协议对您具有法律约束力。在阅读本协议或者以其他任何方式使用或接受【拼趴】提供的任何服务的过程中，如果您不同意本协议全部或其中任何条款约定，您应立即停止注册程序或停止以其他任何方式使用或接受【拼趴】提供的任何服务。

							1.4
							除非您已阅读并接受本服务协议所有条款，否则您将不能使用【拼趴】提供的任何服务，如您不同意本协议的任意内容，请勿使用【拼趴】的服务。若您以任何方式实际访问、使用或接受了【拼趴】提供的任何服务，则视为您同意并接受本协议的内容，本协议对您具有法律约束力。

							1.5 在使用【拼趴】的服务前，您确认已完整阅读并明确知晓本协议的全部内容，且您对本协议中的加粗字体、下划线等重点标示条款已充分理解。

							1.6【拼趴】有权根据实际情况不断修订本协议及【拼趴】平台规则，并以在【拼趴】平台公示的形式进行更新和通知，不再单独通知您。经修订的本协议及【拼趴】平台规则一经在【拼趴】平台公示，即对您产生法律约束力效力。如您不同意相关修订内容，请您立即停止使用【拼趴】提供的任何服务。如您在修订事项生效后仍然继续使用【拼趴】平台服务，则视为您已同意并接受生效的变更事项。

							第二条 定义
							2.1【拼趴】平台：指由{【拼趴】、【拼趴】的关联方或合作方}现在或将来拥有合格权限运营/管理的，享有全部知识产权的，提供特卖活动销售信息等技术服务的网络服务平台、APP客户端及【公众号商城】。

							2.2【拼趴】/【拼趴】平台经营者：指【长沙市联联传媒有限公司】。

							2.3 商户：指在【拼趴】平台上发布特卖活动销售信息、向您提供商品/服务的自然人、法人和其他组织。

							2.4
							用户：在【拼趴】平台注册并使用其本人注册的账户，或者以其他任何方式使用或接受【拼趴】平台提供的任何服务，通过【拼趴】平台展示的特卖活动等信息获取商品/服务的个人，或者为任何之目的使用【拼趴】平台相关服务的使用人，在本协议中更多称呼为“您”。

							2.5【拼趴】平台服务：【拼趴】作为第三方平台，为各类商户提供各类特卖活动销售信息发布及展示平台，以供您浏览相关信息并与商户达成交易的各项信息技术服务。【拼趴】平台服务仅包含【拼趴】所提供的信息技术服务，【拼趴】平台经营者并不实际参与或提供任何商品/服务的交易。

							2.6【拼趴】平台规则：包括在【拼趴】网络服务平台、APP客户端及【公众号商城】等在内的各种形态（包括随着技术发展更新的服务形态）内已经发布及后续发布的全部规则、声明、政策、解读、实施细则、公告等内容。

							第三条 协议主体与补充协议
							3.1 签约主体

							3.1.1 本协议签约主体为您与【拼趴】平台经营者（具体参见本协议的定义条款），本协议对您与【拼趴】平台经营者均具有法律约束力。
							3.1.2
							本协议项下，【拼趴】平台经营者可能根据【拼趴】平台业务的发展变化而发生变更、新增或减少（合称“变更”）。若发生变更后您仍然使用【拼趴】平台服务的，则视为您同意变更的【拼趴】平台经营者与您共同履行本协议。发生争议时，您可根据您具体使用的服务及对您权益产生影响的具体行为对象确定争议相对方。
							3.2 补充协议

							3.2.1
							由于互联网行业快速发展的特点，本协议并不能完整罗列并覆盖您与【拼趴】所有的权利与义务，亦不能保证完全符合日益发展的新需求。因此，【拼趴】平台公示的平台规则、声明、政策、解读、实施细则、公告和协议等均为本协议的补充协议，为本协议不可分割的一部分且具有同等法律效力。如您使用【拼趴】平台提供的服务，即视为您同意前述补充协议并受其约束。
							第四条 账户注册与使用
							4.1 用户资格

							您知悉并承诺，您具有完全民事权利能力和行为能力，或虽不具有完全民事权利能力和行为能力但已经过您的家长和其他法定监护人同意并由您的家长和其他法定监护人代理注册及使用【拼趴】提供的各项服务。否则，您及您的监护人应依照法律规定承担因此而导致的一切后果。

							4.2 注册信息

							4.2.1
							您应遵循诚实信用、合法善意的原则，向【拼趴】提交相关注册资料、设置会员名、邮箱、手机号码等账户资料（合称“账户名称”）并设置密码（账户名称及密码合称“账户”）。相关注册资料及账户名称应当遵守法律法规、社会主义制度、国家利益、公民合法权益、公序良俗、社会道德风尚和信息真实等原则，不应提交任何违法或不良信息，不得冒用关联机构或社会名人的名义。相关资料如有变动，您应及时更新。
							4.2.2
							您了解并同意，您有义务保持您提供信息的真实性及有效性。若您所设置的账户名称违反国家法律法规及【拼趴】平台规则的相关管理规定或冒用关联机构或社会名人的名义引起误解或歧义，【拼趴】可对您的账户名称进行暂停使用或注销等处理，并向主管机关报告。
							4.2.3
							当出现根据国家法律法规规定您需要填写真实身份信息并通过相关验证流程后方可使用相关服务的情形时，您承诺将予以配合。如您填写的身份信息不完整、不真实或未通过验证，导致您无法使用相关服务，造成自身或他人利益损害或其他不良后果的，您应承担相关（法律）责任。
							4.2.4
							为了确保您的账户安全并便于【拼趴】更好地服务与您，您同意并授权，【拼趴】平台经营者可以根据您提供的手机号码、身份证号码等信息，向全国公民身份号码查询服务中心、电信运营商、金融服务机构等相关单位发起用户身份真实性、用户征信记录、用户手机号码有效性状态等情况的查询。对于您通过平台达成的交易，您同时授权【拼趴】使用或允许经【拼趴】审核许可的第三方在必要、合理的限度内使用您的个人信息，包括但不限于身份信息、账户信息、交易信息等。
							4.2.5
							您应当及时更新您通过平台提供的信息并确保其真实性、完整性、有效性，并在第一时间同时通知与您达成交易的相关商户。如存在法律法规的明确规定或根据【拼趴】平台经营者的需要，您同意并授权【拼趴】平台经营者检查、核实您的信息。
							4.3账户使用

							4.3.1 您有权使用您设置或确认的账户登录【拼趴】平台。
							4.3.2
							您承诺不存在盗用、借用、买入非本人手机号码、电子邮箱等进行注册账户、虚假交易和作弊交易的行为。若您若存在上述违规行为，【拼趴】有权对您采取封停帐号、停止服务的措施，并停止向您提供服务。如您因此给【拼趴】造成损失的，【拼趴】保留追究赔偿及诉至法律途径解决的权利。
							4.3.3 通过您的账户所发生的所有行为（包括但不限于在线签署任何协议，浏览、购买、支付、点评、上传、发布、输入任何内容）将视为您本人的真实意思表示。您应对您账户下进行的行为和发生的事件承担相关责任。
							4.3.4
							您承诺通过平台购买商品/服务系出于自身真实消费之目的。您不得将帐户出借、转让或用作真实消费以外的用途，否则因帐户未妥善保管而造成损失的，您承担相应法律责任，除非有证据证明该出借、转让行为非您主观故意。若您因【拼趴】平台帐户被盗或因其他非您个人的原因造成损失的，您应立即通知【拼趴】并向公安机关报案。当您的账户遭到未经授权的使用时，您应当立即通知【拼趴】平台，否则未经授权的使用行为均视为您本人的行为，您将自行承担所有由此导致的损失及后果。
							4.3.5
							如您的账户连续超过24个月未登录，【拼趴】有权对该账户进行注销、清理，您的账户将不能再登录【拼趴】平台，相应服务同时终止。【拼趴】在对此类账户进行清理前，将以包括但不限于公告、站内消息、客户端推送信息等方式通知您。
							4.3.6
							对于您通过本平台达成的交易，您承诺不以任何形式、在任何地点进行以盈利或损害他人利益为目的的转售行为，否则【拼趴】平台经营者有权代商户取消相关交易，并采取注销账户等形式停止向您提供服务。如该等行为对【拼趴】造成不利影响的，您应承担相应的法律责任。
							4.3.7 您知悉并同意，在符合法律法规规定或经国家机关要求的前提下，【拼趴】有权对您的账户进行限制或冻结。在该等情况下，您可能无法继续登陆或使用您的账户。
							4.4 账户安全

							4.4.1 您的账户为您自行设置并由您保管。建议您务必保管好您的账户，并确保您在每个上网时段结束时退出登录【拼趴】平台。
							4.4.2 账户因您主动泄露或遭受他人攻击、诈骗等行为导致的损失及后果，均由您自行承担。
							4.4.3
							如发现任何未经授权使用您账户登录【拼趴】平台或其他可能导致您账户遭窃、遗失的情况，建议您立即通知【拼趴】。您理解【拼趴】对您的任何请求采取行动均需要合理时间，除【拼趴】存在过错外，【拼趴】对在采取行动前已经产生的后果不承担任何责任。
							第五条 【拼趴】平台服务
							5.1
							您知悉并理解，【拼趴】为促进您和商户达成交易的第三方服务平台，仅为您和商户达成交易提供居间服务，并非您实际所购商品/服务交易的相对方。您所购商品/服务的实际提供方为平台交易页面公示的商户，您应根据平台展示的信息独立选择是否与商户达成交易。如您选择与商户达成交易，所购商品/服务的价款将由【拼趴】代商户收取，相应商品/服务的质量、售后保障服务等均由商户负责并承担法律责任。【拼趴】平台经营者公示该等商品/服务的相关信息并不意味着对其进行任何形式的明示或默示的保证或担保。

							5.2
							您通过【拼趴】点击提交订单并付款成功之后，您即与商户达成交易合同。商户通过【拼趴】向您发放【订单信息】。您知悉【订单信息】不记名、不挂失、不可兑换现金。您负有妥善保管【订单信息】的义务，如因您个人原因导致【订单信息】丢失或者泄露，从而造成您无法消费或未实际消费但【订单信息】已被验证或消费等后果的，您应自行承担相关责任。

							5.3
							【订单信息】为您要求商户向您提供相应的商品/服务的重要凭证，您应在有效期内持【订单信息】至商户处进行消费。【订单信息】的有效期内，商户有义务按照您确认的订单信息与其在平台发布的商品/服务信息向您提供相关商品/服务，您亦应按照商户发布的信息与要求履行相关权利义务。不在有效期内的【订单信息】不可作为您要求商户提供商品/服务的凭证。

							5.4 您通过平台向商户购买的商品/服务的发票、凭证或服务单据，由商户直接向您提供，金额以您实际支付的购买价款为准。【拼趴】并不负有向您提供该等发票、凭证或服务单据的义务。

							5.5
							您应本着诚实信用的原则与商户交易、消费、点评，不得对所购商品/服务和商户进行虚假评价。您在【拼趴】平台发布的任何信息均仅代表您的个人观点，由您自行独立承担法律责任，与【拼趴】平台无关。若您采取虚构事实、夸张等任何方式恶意诋毁【拼趴】或商户的商誉，【拼趴】可随时注销您的账户、终止对您提供服务，同时您还应承担引发的相关法律责任。

							5.6 若您通过平台购买商品/服务后发生消费争议，应第一时间与商户友好协商解决，【拼趴】可予以协助。您知悉并理解，除非法律法规有明确规定，【拼趴】平台经营者不对商户的任何经营行为承担法律责任。

							5.7 您同意并授权【拼趴】或【拼趴】授权或认可的第三方商户、广告商通过您使用服务时填写的联系方式向您发送相关商品/服务的促销优惠等商业性信息。您也可以随时通过【拼趴】提供的退订方式进行退订。

							5.8
							如您在使用平台提供的服务的过程中，或在对所购买的商品/服务进行消费的过程中发现商户存在虚假宣传、误导消费者情形或相关商品/服务信息违反法律法规规定，您可及时向【拼趴】或有关机关举报、投诉，【拼趴】将会在合理时间之内核实、处理，并协助您解决相关问题。

							第六条 用户行为规范与责任承担
							6.1
							在使用【拼趴】平台提供的服务过程中，您同意并承诺遵守《中华人民共和国电信条例》、《中华人民共和国保守国家秘密法》等有关法律、法规、规范性文件的规定。如若【拼趴】有合理相信您的行为可能违反前述规定，则【拼趴】有权立即终止向您提供服务而不需提前通知或取得您的同意。

							6.2
							您承诺并保证向【拼趴】平台以及商户提供真实、准确、完整、有效的信息，及时予以更新，并特别遵守本协议第四条“账户注册与使用”项下的约定。若因为您的原因导致【拼趴】平台以及商户无法提供服务的，【拼趴】平台以及商户有权暂停向您提供服务，直至您提交正确并经【拼趴】平台以及商户认可的信息。【拼趴】平台并不对因您的行为导致的损失承担责任。

							6.3
							您承诺并保证认真阅读产品/服务的介绍，自您提交订单并付款成功之后，【拼趴】平台及商户将不再提供退换服务。成功抢购产品/服务后，须及时在产品介绍中提及的使用期内预约使用，逾期未使用的，视为您放弃本次产品/服务，您将无权向【拼趴】平台及商户请求任何补偿或赔偿。

							6.3 您应遵守善意且用于自身真实消费的目的使用【拼趴】平台提供的服务，不利用【拼趴】平台谋取不正当利益、侵犯他人合法权益、扰乱【拼趴】平台的正常交易秩序，否则【拼趴】平台有权注销您的账户、终止对您提供服务。

							6.4 您承诺并保证您在【拼趴】平台发布的内容（包括您的账户名称等信息）不含有以下内容：

							（一）反对宪法所确定的基本原则的；
							（二）危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；
							（三）损害国家荣誉和利益的；
							（四）煽动民族仇恨、民族歧视，破坏民族团结，或者侵害民族风俗、习惯的；
							（五）破坏国家宗教政策，宣扬邪教和封建迷信的；
							（六）散布谣言，扰乱社会秩序，破坏社会稳定的；
							（七）散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；
							（八）侮辱或者诽谤他人，侵害他人合法权益的；
							（九）危害社会公德，损害民族优秀文化传统的；
							（十）含有法律、行政法规、规范性文件等禁止的其他内容的。
							6.5 您理解并保证不进行下列【拼趴】平台禁止的行为，也不允许任何人利用您的账户进行下列行为：

							（1）发送任何未经【拼趴】同意或授权的广告推广、宣传资料，或开展任何形式的商业推广活动；
							（2）未经【拼趴】明确同意，使用【拼趴】平台服务用于任何商业用途或为任何第三方的利益；
							（3）未经【拼趴】明确同意，使用【拼趴】平台以谋取不正当利益，或损害国家、集体或第三人的利益；
							（4）不以自身真实消费为目的，采取各种不正当方式大量购买商品/服务以囤积牟利，或大量退货，干扰正常交易秩序，损害商户、其他用户或【拼趴】平台利益；
							（5）以“刷单”等不正当方式帮助商户提升商誉，或滥用评价权利对其他用户、商户实施威胁、敲诈勒索；
							（6）未经他人明确同意，分享或发布可识别他人个人身份的资料；
							（7）以非法入侵服务器、篡改代码等方式损害【拼趴】平台系统，干扰【拼趴】平台的正常运行秩序；
							（8）故意传播病毒，破坏网络秩序，损害国家、集体或第三人的利益；
							（9）违反任何相关的法律、行政法规、规范性文件、规章、条例等规定，或从事任何侵害国家、集体、第三人以及【拼趴】平台利益的行为 。
							6.6
							如果您违反前述约定或包含本协议在内的平台规则的约定，【拼趴】平台有权根据实际情况采取封停账户、暂停提供服务、删除违法违规信息、禁止评论、永久封禁账户、注销账户并停止向您提供服务等处理措施。同时，您将承担因此产生的一切责任。如给【拼趴】平台造成不利影响的，您应负责消除影响、恢复名誉，并且赔偿【拼趴】平台经营者因此导致的一切损失，包括且不限于财产损害赔偿、名誉损害赔偿等，承担律师费、诉讼费等因维权产生的合理费用。

							第七条 【拼趴】平台的权利义务
							7.1 您理解并同意，由于互联网行业快速发展的特点，【拼趴】有权制定并更新【拼趴】的平台规则等，并以【拼趴】平台公示的形式进行通知，不再单独通知您。

							7.2 在尽力不对您的使用造成影响的情况下，【拼趴】有权对平台功能进行更新、升级，对相关服务器进行停机维护。若可能影响您使用【拼趴】平台服务的，【拼趴】会提前公告。

							7.3【拼趴】平台以及平台经营者应尽力保护您的个人信息，不得随意泄露。

							7.4【拼趴】平台有权代商户向您收取商品/服务的购买款。

							7.5【拼趴】平台应尽力向您提供持续、稳定、顺畅的服务，维护平台的正常秩序。

							7.6【拼趴】有权监督您在平台的交易活动以及您对平台的使用情况。若发现您违反本协议的约定或者相关法律、法规、规范性文件等规定的，【拼趴】有权采取封停账户、暂停提供服务、注销账户并停止向您提供服务等处理措施。

							7.7
							在任何情形下，对于由于互联网正常的设备维护、网络连接故障、通讯故障、电力故障或其他系统的故障，以及罢工，暴乱，骚乱，灾难性天气（如火灾、洪水、风暴等），爆炸，战争，政府行为，司法行政机关的命令或第三方的不作为而造成的【拼趴】平台不能履行或延迟履行本协议项下服务导致的后果，或者导致您相关信息、记录丢失的情形，【拼趴】平台免于承担责任，但【拼趴】平台应在合理时间内合理协助您处理善后事宜，尽力维护您的经济利益不受（进一步）损害。




							感谢您的耐心阅读！
						</view>
						<view class="cu-btn round agreement-btn padding-lr-lg bg-blue" @click="agreementHide">
							确定
						</view>
					</view>
				</view>


				<view class="padding flex flex-direction">
					<button @click="alertDetail" class="cu-btn round lg" :style="{'background-color':color.yellow}">立即开通</button>
				</view>
				<!--toast提示-->
				<tui-toast ref="toast"></tui-toast>
			</view>
		</view>

		<!-- end非年卡用户界面 -->
		<view v-else style="background-color: #fff;">

			<view class="crd">
				<view style=" margin-left: 30rpx; padding-top: 20rpx;">
					<text class="cuIcon-back"></text>
					<text @click="win()" style="font-size: 30rpx; font-weight: 400; margin-left: 10rpx;">返回</text>
				</view>
				<view class="text-white crd-hone crd-all" style="margin-left: 20px;">
					您好，***
				</view>
				<view class="text-gray crd-all margin-top-lg" style="text-align: center;">
					<text class="margin-right-xl padding-right-xl">佣金:<text class="text-green">299</text></text>
					<text class="padding-left-xl padding-right-xl">推广人数:<text class="text-green">{{people}}</text></text>
				</view>
			</view>
			<view class=" fillet"></view>
			<view class="wih" style="margin-top: 10rpx;">
				<!-- 二维码 -->
				<view style="width: 400rpx;height: 400rpx;margin:0 auto;">
					<view class="qrimg">
						<view class="qrimg-i">
							<tki-qrcode ref="qrcode" :val="val" :size="size" :unit="unit" :background="background" :foreground="foreground"
							 :pdground="pdground" :lv="lv" :onval="onval" :loadMake="loadMake" :usingComponents="true" />
						</view>
					</view>
				</view>
			</view>
			<view class="padding flex flex-wrap justify-between align-center bg-white ">
				<view class="cu-btn round bg-gray  padding-lg margin-left-xl lg">保存二维码</view>
				<view class="cu-btn round  bg-gray padding-lg margin-right-xl lg">续费年卡</view>
			</view>
		</view>
		<view class="last" style="margin-top: 10rpx;">
			<text class="text-sm text-gray " style="padding-left: 20px;">推广用户</text>
			<view class="cu-list menu-avatar margin-tb-lg">
				<view class="cu-item" v-for="(item,index) in extensionList" :key="index">
					<view class="cu-avatar round lg" :style="[{backgroundImage:'url('+item.avatar+')'}]"></view>
					<view class="content">
						<view class="text-grey">{{item.nickname}}</view>
					</view>
					<view class="action">
						<view class="text-grey text-xs">{{item.createTime}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="container foot">
			<tui-divider>已经到底部了</tui-divider>
		</view>
	</view>

	</view>
</template>

<script>
	import tuiIcon from "@/components/icon/icon"
	import tuiDivider from "@/components/divider/divider"
	import tuiButton from "@/components/button/button"
	import tuiToast from "@/components/extend/toast/toast"
	import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue'
	import {
		yearCardList,
		yearCardInfo,
		newyearCard
	} from "@/api/card-detail.js"

// 跳掉微信支付
	import {
		getPrepayData
	} from '@/api/pay.js'
	export default {
		components: {
			tuiIcon,
			tuiDivider,
			tuiButton,
			tuiToast,
			tkiQrcode
		},
		data() {
			return {
				val: '二维码', // 要生成的二维码值
				size: 400, // 二维码大小
				unit: 'upx', // 单位
				background: 'transparent', // 背景色
				foreground: '#000', // 前景色
				pdground: '#000', // 角标色
				lv: 3, // 二维码容错级别 ， 一般不用设置，默认就行
				onval: false, // val值变化时自动重新生成二维码
				loadMake: true, // 组件加载完成后自动生成二维码
				CustomBar: this.CustomBar,
				cuIcon: [{
					name: 'ticket',
					isShow: true
				}],

				isMember: false,
				backbarHeight: 0,
				deviceHeight: 0,
				agreementIsShow: false,
				color: {
					yellow: "#d4b670"
				},
				scollLeft: 0,
				old: {
					scollLeft: 0
				},
				yearCards: {},
				yearCardList: {},
				isVip: false,
				extensionList: [],

				people: ''
			}
		},
		// async onPullDownRefresh() {
		// 	const CouponListres = await getCouponList(1, 20);
		// 	setTimeout(function() {
		// 		uni.stopPullDownRefresh();
		// 	}, 1000);
		// },
		mounted: async function(options) {
			let that = this;
			uni.getSystemInfo({
				success: function(res) {
					that.deviceHeight = res.windowHeight
				},
			});
			this.backbarHeight = parseInt((this.$refs.backbar.style).split(":")[1]);
			const yearCord = await yearCardList(1, 1)
			this.yearCards = yearCord.data.page.list[0];
		
			const USERDATA = uni.getStorageSync('USERDATA')
			// USERDATA.yearCardUser
			this.isVip = false;
			// 推广用户列表
			this.extensionList = res.data.YearcardRecord.userList;
			this.extensionList.map((res) => {
				res.createTime = res.createTime.split(' ')[0].split('-')[1] + '-' + res.createTime.split(' ')[0].split('-')[2]
			})

			// 推广人数
			this.people = this.extensionList.length
		},
		methods: {
			async alertDetail() {
				// uni.showToast({
				// 	title: '跳到支付页面',
				// })
				// ycid,uid
				const USERDATA = uni.getStorageSync('USERDATA')
				var res = await yearCardInfo(USERDATA.uid)
				if(res){
					// 是会员续费
					uni.navigateTo({
						url: "/pages/pay/pay?status=oldyearcard&price=1&orderType=10"
					})
				}else{
					// 新开通会员
					uni.navigateTo({
						url: "/pages/pay/pay?status=newyearcard&price=1&orderType=10"
					})
				}
			},
			alertTips() {
				uni.showToast({
					title: '请开通年卡',
				})
			},
			NavigateToGame() {
				console.log("游戏页面")
				// uni.navigateTo({
				// 	url: "",	
				// });
			},
			showToast() {
				let params = {
					title: "请开通年卡",
					icon: false
				};

				this.$refs.toast.show(params)
			},
			agreementShow() {
				this.agreementIsShow = true
			},
			agreementHide() {
				this.agreementIsShow = false
			},
			scroll: function(e) {
				this.old.scollLeft = e.detail.scollLeft
			},
			win() {
				uni.navigateTo({
					url: "/pages/user/user"
				})
			},
		}

	}
</script>

<style>
	.agreement-mask {
		width: 100%;
		height: 100vh;
		background: rgba(0, 0, 0, .6);
		position: absolute;
		top: 0rpx;
		z-index: 8888;
	}

	.agreement {
		width: 80%;
		height: calc(100vh - 220rpx);
		border-radius: 30rpx;
		position: absolute;
		left: 10%;
		top: 120rpx;

	}

	.agreement-item {
		width: 100%;
		height: calc(100% - 110rpx);
		overflow: scroll;
		text-indent: 2em;
	}

	.agreement-btn {
		position: absolute;
		bottom: 20rpx;
		left: 50%;
		transform: translateX(-50%);
	}
</style>
