import { formatTime, timeAgo } from "@/lib/utils";
import type { ChatPortal } from "@prisma/client";

export default function NotificationEmail(portals: ChatPortal[]) {
  let portalList = "";

  for (const portal of portals) {
    const time = timeAgo(portal.lastMessageAt);
    const acuateTime = formatTime(portal.lastMessageAt!, "do MMM-yy HH:MM:SS");

    const url = `https://kepathalo.monzim.com/${portal.id}`;

    portalList += `	<tr>
															<td class="pad">
																<div class="levelOne" style="margin-left: 0;">
																	<ul class="leftList" start="1"
																		style="margin-top: 0; margin-bottom: 0; padding: 0; padding-left: 20px; font-weight: 400; text-align: left; color: #101112; direction: ltr; font-family: Ubuntu,Tahoma,Verdana,Segoe,sans-serif; font-size: 16px; letter-spacing: 0; line-height: 120%; mso-line-height-alt: 19.2px; list-style-type: disc;">
																		<li style="margin-bottom: 0; text-align: left;">
																			<strong>Portal <a
																					href="${url}"
																					rel="noopener"
																					style="text-decoration: underline; color: #7747FF;"
																					target="_blank">${portal.id}
                                                                                    </a> last message get at ${acuateTime} (${time})
                                                                                </strong>
																		</li>
																	</ul>
																</div>
															</td>
														</tr>`;
  }

  return `
<!DOCTYPE html>

<html lang="hy-AM" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">

<head>
	<title></title>
	<meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
	<meta content="width=device-width, initial-scale=1.0" name="viewport" />
	<link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@100;200;300;400;500;600;700;800;900"
		rel="stylesheet" type="text/css" /><!--<![endif]-->
	<style>
		* {
			box-sizing: border-box;
		}

		body {
			margin: 0;
			padding: 0;
		}

		a[x-apple-data-detectors] {
			color: inherit !important;
			text-decoration: inherit !important;
		}

		#MessageViewBody a {
			color: inherit;
			text-decoration: none;
		}

		p {
			line-height: inherit
		}

		.desktop_hide,
		.desktop_hide table {
			mso-hide: all;
			display: none;
			max-height: 0px;
			overflow: hidden;
		}

		.image_block img+div {
			display: none;
		}

		@media (max-width:500px) {
			.desktop_hide table.icons-inner {
				display: inline-block !important;
			}

			.icons-inner {
				text-align: center;
			}

			.icons-inner td {
				margin: 0 auto;
			}

			.mobile_hide {
				display: none;
			}

			.row-content {
				width: 100% !important;
			}

			.stack .column {
				width: 100%;
				display: block;
			}

			.mobile_hide {
				min-height: 0;
				max-height: 0;
				max-width: 0;
				overflow: hidden;
				font-size: 0px;
			}

			.desktop_hide,
			.desktop_hide table {
				display: table !important;
				max-height: none !important;
			}
		}
	</style>
</head>

<body style="margin: 0; background-color: #ffffff; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
	<table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation"
		style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; background-image: none; background-position: top left; background-size: auto; background-repeat: no-repeat;"
		width="100%">
		<tbody>
			<tr>
				<td>
					<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1"
						role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
						<tbody>
							<tr>
								<td>
									<table align="center" border="0" cellpadding="0" cellspacing="0"
										class="row-content stack" role="presentation"
										style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 480.00px; margin: 0 auto;"
										width="480.00">
										<tbody>
											<tr>
												<td class="column column-1"
													style="font-weight: 400; text-align: left; mso-table-lspace: 0pt; mso-table-rspace: 0pt; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
													width="100%">
													<table border="0" cellpadding="10" cellspacing="0"
														class="heading_block block-1" role="presentation"
														style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
														width="100%">
														<tr>
															<td class="pad">
																<h1
																	style="margin: 0; color: #1e0e4b; direction: ltr; font-family: 'Ubuntu', Tahoma, Verdana, Segoe, sans-serif; font-size: 38px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 45.6px;">
																	Hey! New Messages in Your Chat Portal! 🚀</h1>
															</td>
														</tr>
													</table>
													<table border="0" cellpadding="10" cellspacing="0"
														class="paragraph_block block-2" role="presentation"
														style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
														width="100%">
														<tr>
															<td class="pad">
																<div
																	style="color:#444a5b;direction:ltr;font-family:'Ubuntu', Tahoma, Verdana, Segoe, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:19.2px;">
																	<p style="margin: 0;">Hope you're doing awesome! 🌟
																		Just wanted to drop you a quick heads up -
																		there's some chatter going on in your chat
																		portals. Check it out: </p>
																</div>
															</td>
														</tr>
													</table>
													<!--[if mso]><style>#list-r0c0m2 ul{ margin: 0 !important; padding: 0 !important; } #list-r0c0m2 ul li{ mso-special-format: bullet; }#list-r0c0m2 .levelOne li { margin-top: 0 !important; } #list-r0c0m2 .levelOne { margin-left: -20px !important; }#list-r0c0m2 .levelTwo li { margin-top: 0 !important; } #list-r0c0m2 .levelTwo { margin-left: 10px !important; }</style><![endif]-->
													<table border="0" cellpadding="10" cellspacing="0"
														class="list_block block-3" id="list-r0c0m2" role="presentation"
														style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
														width="100%">
														 ${portalList}
													</table>
													<table border="0" cellpadding="10" cellspacing="0"
														class="paragraph_block block-4" role="presentation"
														style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
														width="100%">
														<tr>
															<td class="pad">
																<div
																	style="color:#101112;direction:ltr;font-family:'Ubuntu', Tahoma, Verdana, Segoe, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:19.2px;">
																	<p style="margin: 0; margin-bottom: 16px;">Thank you
																		for using <a href="https://kepathalo.monzim.com"
																			rel="noopener"
																			style="text-decoration: underline; color: #7747FF;"
																			target="_blank">Ke-Pathalo</a></p>
																	<p style="margin: 0; margin-bottom: 16px;">
																		<strong>Azraf Al Monzim</strong>
																	</p>
																	<p style="margin: 0;"><a href="https://monzim.com"
																			rel="noopener"
																			style="text-decoration: underline; color: #7747FF;"
																			target="_blank">monzim.com</a></p>
																</div>
															</td>
														</tr>
													</table>
													<table border="0" cellpadding="10" cellspacing="0"
														class="divider_block block-5" role="presentation"
														style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
														width="100%">
														<tr>
															<td class="pad">
																<div align="center" class="alignment">
																	<table border="0" cellpadding="0" cellspacing="0"
																		role="presentation"
																		style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
																		width="100%">
																		<tr>
																			<td class="divider_inner"
																				style="font-size: 1px; line-height: 1px; border-top: 1px solid #dddddd;">
																				<span> </span>
																			</td>
																		</tr>
																	</table>
																</div>
															</td>
														</tr>
													</table>
													<table border="0" cellpadding="10" cellspacing="0"
														class="paragraph_block block-6" role="presentation"
														style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
														width="100%">
														<tr>
															<td class="pad">
																<div
																	style="color:#101112;direction:ltr;font-family:'Ubuntu', Tahoma, Verdana, Segoe, sans-serif;font-size:13px;font-weight:700;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:15.6px;">
																	<p style="margin: 0;"><a
																			href="https://kepathalo.monzim.com"
																			rel="noopener"
																			style="text-decoration: underline; color: #7747FF;"
																			target="_blank">Ke-Pathalo</a> is a <a
																			href="https://monzim.com" rel="noopener"
																			style="text-decoration: underline; color: #7747FF;"
																			target="_blank">monzim.com</a> service.</p>
																</div>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>

				</td>
			</tr>
		</tbody>
	</table><!-- End -->
</body>

</html>
    
    `;
}
