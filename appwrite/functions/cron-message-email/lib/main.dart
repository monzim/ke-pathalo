import 'dart:async';
import 'dart:io';

import 'package:dart_appwrite/dart_appwrite.dart';
import 'package:http/http.dart' as http;

Future<dynamic> main(final context) async {
  final projectId = Platform.environment['APPWRITE_FUNCTION_PROJECT_ID'];
  final apiKey = Platform.environment['APPWRITE_API_KEY'];
  final vercelCronFunctionToken =
      Platform.environment['VERCEL_CRON_FUNCTION_TOKEN'];

  if (projectId == null || apiKey == null || vercelCronFunctionToken == null) {
    context.log('Environment variables not set');
    return context.res.send('Environment variables not set', 404);
  }

  final client = Client()
      .setEndpoint('https://cloud.appwrite.io/v1')
      .setProject(projectId)
      .setKey(apiKey);

  const documentId = '00XXXXXXX-1010101';
  const collectionId = 'system';
  const databaseId = 'prod';

  final databases = Databases(client);
  final now = DateTime.now().toUtc().toIso8601String();
  final res = await databases.getDocument(
      databaseId: databaseId,
      collectionId: collectionId,
      documentId: documentId);

  final lastCheck = res.data['last_cron_check'];
  context.log('Now: $now');
  context.log('Last check: $lastCheck');

  final cronRes = await http
      .get(Uri.parse('https://kepathalo.monzim.com/api/cron'), headers: {
    'Authorization': 'Bearer $vercelCronFunctionToken',
  });

  context.log('Cron response: ${cronRes.statusCode}');

  await databases.updateDocument(
      databaseId: databaseId,
      collectionId: collectionId,
      documentId: documentId,
      data: {'last_cron_check': now});

  context.log('cron status updated');

  return context.res.json({
    'lastCheck': lastCheck,
    'now': now,
    'cronStatus': cronRes.statusCode,
  });
}
