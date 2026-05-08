import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Platform
} from 'react-native';

const { width } = Dimensions.get('window');

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [showMainApp, setShowMainApp] = useState(false);

  const onboardingData = [
    {
      id: 1,
      title: "Добро пожаловать в Flyo ✈️",
      subtitle: "Весь мир развлечений в одном приложении",
      description: "Находи и бронируй рестораны, отели, развлечения и туры по всему миру за пару кликов",
      emoji: "🌍",
      bgColor: "#667eea"
    },
    {
      id: 2,
      title: "Бронируй всё мгновенно ⚡",
      subtitle: "Без очередей и ожидания",
      description: "Один QR код — мгновенное бронирование. Рестораны, отели, экскурсии — всё в твоих руках",
      emoji: "🎯",
      bgColor: "#f093fb"
    },
    {
      id: 3,
      title: "Лучшие цены гарантированы 💰",
      subtitle: "Эксклюзивные предложения",
      description: "Специальные скидки, кэшбэк и бонусы только для пользователей Flyo",
      emoji: "💎",
      bgColor: "#4facfe"
    },
    {
      id: 4,
      title: "Готов к приключениям? 🚀",
      subtitle: "Начни исследовать прямо сейчас",
      description: "Миллионы путешественников уже выбрали Flyo. Присоединяйся!",
      emoji: "🎉",
      bgColor: "#43e97b"
    }
  ];

  const nextScreen = () => {
    if (currentScreen < onboardingData.length - 1) {
      setCurrentScreen(currentScreen + 1);
    } else {
      setShowMainApp(true);
    }
  };

  const skipOnboarding = () => {
    setShowMainApp(true);
  };

  const goToScreen = (index) => {
    setCurrentScreen(index);
  };

  if (showMainApp) {
    return <MainApp />;
  }

  const currentData = onboardingData[currentScreen];

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={currentData.bgColor} />
      <SafeAreaView style={[styles.container, { backgroundColor: currentData.bgColor }]}>
        {/* Skip Button */}
        <TouchableOpacity style={styles.skipButton} onPress={skipOnboarding}>
          <Text style={styles.skipText}>Пропустить</Text>
        </TouchableOpacity>

        {/* Content */}
        <View style={styles.content}>
          <View style={styles.emojiContainer}>
            <Text style={styles.emoji}>{currentData.emoji}</Text>
          </View>

          <Text style={styles.title}>{currentData.title}</Text>
          <Text style={styles.subtitle}>{currentData.subtitle}</Text>
          <Text style={styles.description}>{currentData.description}</Text>
        </View>

        {/* Bottom Navigation */}
        <View style={styles.bottomContainer}>
          {/* Dots Indicator */}
          <View style={styles.dotsContainer}>
            {onboardingData.map((_, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dot,
                  { backgroundColor: currentScreen === index ? 'white' : 'rgba(255,255,255,0.3)' }
                ]}
                onPress={() => goToScreen(index)}
              />
            ))}
          </View>

          {/* Navigation Buttons */}
          <View style={styles.buttonContainer}>
            {currentScreen > 0 && (
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => setCurrentScreen(currentScreen - 1)}
              >
                <Text style={styles.backButtonText}>Назад</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.nextButton} onPress={nextScreen}>
              <Text style={styles.nextButtonText}>
                {currentScreen === onboardingData.length - 1 ? 'Начать' : 'Далее'}
              </Text>
            </TouchableOpacity>
          </View>

          {currentScreen === onboardingData.length - 1 && (
            <TouchableOpacity style={styles.loginButton} onPress={skipOnboarding}>
              <Text style={styles.loginButtonText}>Уже есть аккаунт? Войти</Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </>
  );
}

// Главное приложение (показывается после onboarding)
function MainApp() {
  return (
    <SafeAreaView style={styles.mainAppContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
      <View style={styles.mainAppContent}>
        <Text style={styles.welcomeTitle}>🎉 Добро пожаловать в Flyo!</Text>
        <Text style={styles.welcomeSubtitle}>Куда отправимся сегодня?</Text>

        <TouchableOpacity style={styles.exploreButton}>
          <Text style={styles.exploreButtonText}>Исследовать города 🌍</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  skipButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 1,
  },
  skipText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emojiContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  emoji: {
    fontSize: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    lineHeight: 24,
  },
  bottomContainer: {
    paddingHorizontal: 30,
    paddingBottom: 50,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 6,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  backButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  nextButton: {
    backgroundColor: 'white',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    ...(Platform.OS === 'web' ? {
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
    } : {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
    }),
  },
  nextButtonText: {
    color: '#2d3748',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginButton: {
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  // Main App Styles
  mainAppContainer: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  mainAppContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2d3748',
    textAlign: 'center',
    marginBottom: 10,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
    marginBottom: 40,
  },
  exploreButton: {
    backgroundColor: '#667eea',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    ...(Platform.OS === 'web' ? {
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    } : {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    }),
  },
  exploreButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});