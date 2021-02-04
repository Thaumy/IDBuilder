using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

using WaterLibrary.Utils;

namespace IDBuilder4
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }
        private void generate(object sender, RoutedEventArgs e)
        {
            init();
        }

        private void rsa_convert_btn_click(object sender, RoutedEventArgs e)
        {
            if (input.Text != "")
            {
                try
                {
                    rsa_en_de.Text = MathH.RSADecrypt(rsa1.Text, input.Text) ?? MathH.RSAEncrypt(rsa2.Text, input.Text);
                }
                catch { }
            }
        }

        private void md5_convert_btn_click(object sender, RoutedEventArgs e)
        {
            if (input.Text != "")
            {
                try
                {
                    rsa_en_de.Text = MathH.MD5(input.Text);
                }
                catch { }
            }
        }

        private void sha1_convert_btn_click(object sender, RoutedEventArgs e)
        {
            if (input.Text != "")
            {
                try
                {
                    rsa_en_de.Text = MathH.SHA1(input.Text);
                }
                catch { }
            }
        }

        private void init()
        {
            DateTime time = DateTime.Now;

            //时间获得
            string Year = Convert.ToString(time.Year);
            string Month = Convert.ToString(time.Month);
            string Day = Convert.ToString(time.Day);
            string Hour = Convert.ToString(time.Hour);
            string Minute = Convert.ToString(time.Minute);

            //时间补位
            if (Month.Length != 2) Month = "0" + Month;
            if (Day.Length != 2) Day = "0" + Day;
            if (Hour.Length != 2) Hour = "0" + Hour;
            if (Minute.Length != 2) Minute = "0" + Minute;



            string ymdhm = Year + Month + Day + Hour + Minute;

            tb1.Text = Guid.NewGuid().ToString("N");
            tb4.Text = Guid.NewGuid().ToString("D");
            tb2.Text = ymdhm + "-" + Guid.NewGuid().ToString("N").Substring(0, 4);
            tb3.Text = ymdhm;

            var kp = new KeyPair(1024);

            rsa1.Text = kp.PrivateKey;
            rsa2.Text = kp.PublicKey;
        }
    }
}
